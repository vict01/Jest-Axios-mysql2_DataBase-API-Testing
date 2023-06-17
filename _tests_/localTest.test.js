const { executeLocalSQL } = require('../resources/localConnection');
jest.setTimeout(100000);

describe('\nDirect test over the docker container', () => {
    let dbName = 'daily-ops';
    let sql = 'SELECT * FROM transactions limit 3';
    let transactions;

    beforeAll(async () => {
        transactions = await executeLocalSQL(dbName, sql)
    });

    test('Transactions table has more than 2 records', async () => {
        expect(transactions.length).toBeGreaterThan(2);
    });  

});
