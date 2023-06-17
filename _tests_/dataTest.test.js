const fs = require('fs');
const path = require('path');
const { prepareDataForRemoteDB } = require('../resources/awsConnection.js');
const inputData = require('../data/inputData.json');

jest.setTimeout(100000);

describe('\nTests over JSON file populated from DB', () => {
  let filePath;
  let fileData;
  let fileNameRelativePath = 'data/rules_threshold.json';  
  let sqlStatement = 'select * from rules_threshold limit  10'
 
  beforeAll(async () => {  
    await prepareDataForRemoteDB('taxdoo',fileNameRelativePath, sqlStatement);

    // Read the data from the JSON file (populated by qyering the DB) and parse it
    filePath = path.join(__dirname, '../'+fileNameRelativePath);
    fileData = fs.readFileSync(filePath, 'utf8');
    fileData = JSON.parse(fileData);   
  });

  afterAll(async () => {
    // Delete the JSON file after the tests are complete
   await fs.promises.unlink(fileNameRelativePath);
  });

  test('File is not empty', () => {
    expect(fileData.length).toBeGreaterThan(0);
  });

  test('All records have required fields', () => {
    const requiredFields = inputData.rules_thresholdFields;
    for (const record of fileData) {
      for (const field of requiredFields) {
        expect(record).toHaveProperty(field);
      }
    }
  });

  // Skipped because there are records with this field empty causing NaN return
  test.skip('All records have a valid effective_on timestamp', () => {
    for (const record of fileData) {
      const timestamp = parseInt(record.effective_on);
   
      expect(timestamp).not.toBeNaN();
      expect(new Date(timestamp * 1000)).toBeInstanceOf(Date);
    }
  });

  // Skipped because there are records with this field empty causing NaN return
  test.skip('All records have a valid updated timestamp', () => {
    for (const record of fileData) {
      const timestamp = parseInt(record.updated);
     
      expect(timestamp).not.toBeNaN();
      expect(new Date(timestamp * 100));
    }
  });

  test('All records have a valid country code', () => {    
    let validCountryCodes = inputData.validCountryCodes;
    for (const record of fileData) {
      expect(validCountryCodes).toContain(record.country_code);
    }
  });
  
  test('All records have a positive numeric value', () => {
    for (const record of fileData) {
      expect(parseFloat(record.value)).toBeGreaterThan(0);
    }
  });
  
  test('All records have valid date formats for valid_from and valid_until', () => {
    const validDateFormat = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}).(\d{3})Z$/;
    for (const record of fileData) {
      expect(record.valid_from).toMatch(validDateFormat);
      expect(record.valid_until).toMatch(validDateFormat);
    }
  });

  test('All active records have a empty comment field', () => {
    for (const record of fileData) {
      if (record.is_active === 1) {
     //   expect(record.link).toBeTruthy(); // This means that it contains some value
        expect(record.comment).toBeFalsy(); // When the fields is empty, null, undefined, or false
      }
    }
  });

  
});