const mysql = require('mysql2/promise');
console.log(`Running in environment: ${process.env.NODE_ENV}`);

async function createConnectionPool(dbName, host, user, password) {
    return mysql.createPool({
        host: host,
        user: user,
        password: password,
        database: dbName
    });
}

async function executeSql(dbName, sql, host, user, password) {
    try {
        const connectionPool = await createConnectionPool(dbName, host, user, password);

        const connection = await connectionPool.getConnection();
        const [rows] = await connection.query(sql);
        connection.release();

        return rows;
    } catch (error) {
        console.error(error);
    }
}

module.exports = { executeSql };