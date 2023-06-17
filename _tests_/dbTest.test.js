const { executeRemoteSQL } = require('../resources/awsConnection.js');
const inputData = require('../data/inputData.json');

jest.setTimeout(100000);

describe('\nDirect test over database', () => {
    const validCountryCodes = inputData.validCountryCodes;
    let dbName = 'taxdoo'
    let countriesTable, rules_threshold;

    beforeAll(async () => {
        countriesTable = await executeRemoteSQL(dbName, 'SELECT * FROM countries')

        rules_threshold = await executeRemoteSQL(dbName, 'select * from rules_threshold limit  3')
    });

    test('Countries table has more than 26 records', async () => {
        expect(countriesTable.length).toBeGreaterThan(26);
    });

    test('All valid country codes are present in the countries table', async () => {
        for (const record of countriesTable) {
            expect(validCountryCodes).toContain(record.country_code);
        }
    });

    test('All records have a valid country_id', () => {
        for (const record of countriesTable) {
            expect(record.country_id).toBeDefined();
            expect(typeof record.country_id).toBe('number');
            expect(record.country_id).toBeGreaterThan(0);
        }
    });

    test('All records have a valid name country', () => {
        for (const record of countriesTable) {
            expect(record.name).toBeDefined();
            expect(typeof record.name).toBe('string');
        }
    });

    test('The threshold value of Belgium is 35000', async () => {
        // rules_threshold = getdDataFromDB(dbname, 'select * from rules_threshold limit  3')
        // var fileData = JSON.parse(rules_threshold);
        rules_threshold.forEach(json => {
            const { id, country_code, value } = json;
            // console.log(` ID: ${id}\n Country Code: ${country_code}\n Value: ${value}`);
            if (country_code == 'BE') {
                expect(value).toEqual('35000');
            }
        })
    });

    test('Update field effective_on in rules_threshold', async () => {
        let sqlStament = 'update rules_threshold set effective_on=1461766605 where id=2';
        const rules_threshold = await executeRemoteSQL(dbName, sqlStament);
        // console.log(rules_threshold.info);

        expect(rules_threshold.affectedRows).toBeGreaterThan(0);
    });

});
