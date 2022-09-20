const express = require('express');
const Mysql = require('@translated/db-connection');
const { body, validationResult } = require('express-validator');
const app = express();

require('dotenv').config();

const database = new Mysql.default(`mysql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@localhost:3306/${process.env.DB_NAME}`);

// const query = "CREATE TABLE authtoken (id INT AUTO_INCREMENT PRIMARY KEY, username VARCHAR(255) not null, token VARCHAR(255) not null, tos BOOLEAN not null default 1)";
const querySelect = "SELECT * FROM authtoken";

// const q = database.select(querySelect);

// const t = q.then((res) => {
//     console.log(res);
// });

// console.log(tawait);

const s = async() => {
    const v = await database.select(querySelect);
    
    console.log(v);
}

s();


