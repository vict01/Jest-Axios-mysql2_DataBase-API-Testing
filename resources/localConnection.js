const { executeSql } = require('./connectionAndData');

const dbConfig = {
  host: process.env.HOST,
  user: process.env.USER_DB,
  password: process.env.PWD_DB
};

async function executeLocalSQL(dbName, sql) {
  try {
    const result = await executeSql(dbName, sql, dbConfig.host, dbConfig.user, dbConfig.password);
    return result;
  } catch (error) {
    console.error(error);
    throw error; 
  }
}

module.exports = { executeLocalSQL };