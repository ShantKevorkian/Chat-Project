const Database = require('@translated/db-connection').default;
require('dotenv').config();

const database = new Database(`mysql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@localhost:3306/${process.env.DB_NAME}`, Function.prototype, { decimalNumbers: true });

module.exports = database;