const dotenvJSON = require("dotenv-json");
const env = "dev";

process.env.NODE_ENV = process.env.AWS_PROFILE || env;

switch (process.env.NODE_ENV) {
    case 'prod':
        dotenvJSON({ path: "./env.prod.json" });
        break;
    case 'dev':
        dotenvJSON({ path: "./env.dev.json" });
        break;
    case 'local':
        dotenvJSON({ path: "./env.test.json" });
        break;
    default:
        dotenvJSON({ path: "./env.dev.json" });
        break;
}
