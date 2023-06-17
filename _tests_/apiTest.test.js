const axios = require('axios');
const inputData = require('../data/apiData.json');
const userScenariosData = require('../data/userScenariosData.json');
const apiUrl = inputData.appData.urlApi

describe('\nREST-API Tests', () => {
    let token;

    beforeAll(async () => {
        const login = await axios.post(apiUrl + '/login', inputData.loginData);
        expect(login.status).toBe(200);
        token = login.data.token;
        // console.log(`The token is: ${token}`)
    });

    describe('\nUser Creation Tests', () => {
        test('Create user', async () => {
            const userInfo = inputData.userInfo;

            const response = await axios.post(apiUrl + '/users', userInfo, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            // console.log(`The response creating user is:\n ${JSON.stringify(response.data)}`)
            expect(response.status).toBe(201);
            expect(response.data).toHaveProperty('name', userInfo.name);
            expect(response.data).toHaveProperty('job', userInfo.job);
            expect(response.data).toHaveProperty('id');
            expect(response.data).toHaveProperty('createdAt');
        });
    });

    describe('\nGet User Tests', () => {
        const scenarios = Object.entries(userScenariosData);

        test.each(scenarios)('Get user per id - %i with global assertion', async (id, expectedData) => {
            const response = await axios.get(`${apiUrl}/users/${id}`);

            expect(response.status).toBe(200);
            expect(response.data.data).toEqual(expectedData);
        });

        test.each(scenarios)('Get user per id - %i with custom assertion', async (id, expectedData) => {
            const response = await axios.get(`${apiUrl}/users/${id}`);
            expect(response.status).toBe(200);

            if (id == 1) {
                expect(response.data.data.id).toEqual(expectedData.id);
            } else if (id == 2) {
                expect(response.data.data.email).toEqual(expectedData.email);
            } else if (id == 3) {
                expect(response.data.data.first_name).toEqual(expectedData.first_name);
            } else if (id == 4) {
                expect(response.data.data.last_name).toEqual(expectedData.last_name);
            } else {
                expect(id).not.toBe(id);
            }
        });

    });

});