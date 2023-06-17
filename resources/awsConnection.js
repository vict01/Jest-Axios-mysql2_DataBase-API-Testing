const AWS = require('aws-sdk');
const { executeSql } = require('./connectionAndData');
const path = require('path');
const fs = require('fs');

AWS.config.credentials = new AWS.SharedIniFileCredentials({ profile: process.env.AWS_PROFILE || process.env.PROFILENAME });
const secretsManagerClient = new AWS.SecretsManager({ region: process.env.REGION });

async function executeRemoteSQL(dbName, sql) {
  try {
    const data = await secretsManagerClient.getSecretValue({ SecretId: process.env.SECRETNAME }).promise();
    const secret = JSON.parse(data.SecretString);

    const dbConfig = {
      host: secret.host,
      user: secret.username,
      password: secret.password,
    };

    const result = await executeSql(dbName, sql, dbConfig.host, dbConfig.user, dbConfig.password);
    return result;
  } catch (error) {
    console.error(error);
    throw error; 
  }
}

const prepareDataForRemoteDB = async (dbName, fileNameRelativePath, sqlStatement) => {  
    const rows = await executeRemoteSQL(dbName, sqlStatement);

    const maskedRows = rows.map(row => {
      const { user, ...rest } = row;
      return { ...rest, user: '***' };
    });

    const filePath = path.join(__dirname, '../', fileNameRelativePath);
    fs.writeFileSync(filePath, JSON.stringify(maskedRows));
}

module.exports = { executeRemoteSQL, prepareDataForRemoteDB };