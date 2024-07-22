const dotenv = require('dotenv');
dotenv.config();

const dbConfig = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
};

const apiKey = process.env.API_KEY;
const port = process.env.PORT || 3000;

module.exports = { dbConfig, apiKey, port };
