/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */

module.exports = {
  testMatch: ["**/__tests__/**/*.js?(x)", "**/?(*.)+(spec|test).js?(x)"],
  reporters: ["default"],  
  verbose: true,
  testEnvironment: "node",
  transform: {
    "^.+\\.js$": "babel-jest"
  },
  roots: ["./"],
  // the following line is needed in order to grab modules from the
  // src folder without the need to write them relatively
  moduleDirectories: ["node_modules", "src"],
  setupFiles: ['./setupTests.js']  
};