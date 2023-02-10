// const inquirer = require('inquirer');
// const table = require('console.table');
const mysql = require('mysql2');
const figlet = require('figlet');
const gradient = require('gradient-string');
require('dotenv').config();

const db = mysql.createConnection({
    host: process.env.host,
    user: process.env.username,
    password: process.env.password,
    database: process.env.database
});

figlet.text('Employee Tracker',
    {
        font: 'Rectangles',
        horizontalLayout: 'default',
        verticalLayout: 'default',
    }, function (err, data) {
        if (err) {
            console.log('Something went wrong!');
            console.dir(err);
            return;
        }
        console.log(gradient.pastel.multiline(data));
    });
