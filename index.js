// const inquirer = require('inquirer');
// const table = require('console.table');
const mysql = require('mysql2');
const figlet = require('figlet');
const gradient = require('gradient-string');
const inquirer = require('inquirer');
require('dotenv').config();

const db = mysql.createConnection({
    host: process.env.host,
    user: process.env.username,
    password: process.env.password,
    database: process.env.database
});

inquirer.prompt([{
    type: 'list',
    name: 'options',
    message: 'Welcome to Employee Tracker! What would you like to do?',
    choices: [
        "View all Departments",
        "View all Roles",
        "View all Employees",
        "Add a Department",
        "Add a Role",
        "Add an Employee",
        "Update Employee Managers",
        "View Employees by Department",
        "View Employees by Manager",
        "Delete Department",
        "Delete Role",
        "Delete Employee",
        "Quit",

    ],
}]).then(answers => {
    switch (answers.options) {
        case "View all departments":
            viewAllDepartments();
            break;
        case "View all roles":
            viewAllRoles();
            break;
        case "View all employees":
            viewAllEmployees();
            break;
        case "Add a department":
            addDepartment();
            break;
        case "Add a role":
            addRole();
            break;
        case "Add an employee":
            addEmployee();
            break;
        case "Update Employee Managers":
            updateEmployeeManagers();
            break;
        case "View Employees by Department":
            viewByDepartment();
            break;
        case "View Employees by Manager":
            viewByManager();
            break;
        case "Delete Department":
            deleteDepartment();
            break;
        case "Delete Role":
            deleteRole();
            break;
        case "Delete Employee":
            deleteEmployee();
            break;
        case "Quit":
            db.end()
            console.log("Bye")
    }
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
