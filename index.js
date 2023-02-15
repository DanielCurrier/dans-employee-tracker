const inquirer = require('inquirer');
const table = require('console.table');
const mysql = require('mysql2');
const figlet = require('figlet');
const gradient = require('gradient-string');
require('dotenv').config();

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

const questions = () =>
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
            case "View all Departments":
                viewAllDepartments();
                break;
            case "View all Roles":
                viewAllRoles();
                break;
            case "View all Employees":
                viewAllEmployees();
                break;
            case "Add a Department":
                addDepartment();
                break;
            case "Add a Role":
                addRole();
                break;
            case "Add an Employee":
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
                break;
        }
    });

const viewAllDepartments = () => {
    const sql = 'SELECT * FROM Department';
    db.query(sql, (err, res) => {
        if (err) console.log(err);
        console.table(res);
        questions();
    })
}

const viewAllRoles = () => {
    const sql = `SELECT * FROM Role`;
    db.query(sql, (err, res) => {
        if (err) console.log(err);
        console.table(res);
        questions();
    })
}

const viewAllEmployees = () => {
    const sql = `SELECT * FROM Employee INNER JOIN roles ON Employee.role_id = Role.role_id INNER JOIN Department ON Role.department_id = Department.department_id `;
    db.query(sql, (err, res) => {
        if (err) console.log(err);
        console.log("This is a list of all our current employees:");
        console.table(res);
        questions();
    })
}

const addDepartment = () =>
    inquirer.prompt([{
        type: "input",
        name: "addedDep",
        message: "What is the name of the new department?"
    }]).then(answers => {
        let sql = "INSERT INTO Department (Department_name) VALUES (?)"
        db.query(sql, answers.addedDep, (err, res) => {
            if (err) console.log(err);
            console.log("Department added successfully!")
            questions();
        })
    });

const addRole = () =>
    inquirer.prompt([{
        type: "input",
        name: "roleName",
        message: "What is the name of the role you would like to add?"
    },
    {
        type: "input",
        name: "salary",
        message: "What is the salary of the new role?"
    },
    ]).then(answers => {
        db.query(`INSERT INTO Role (title, salary) VALUES ("${answers.roleName}", "${answers.salary}")`, (err, res) => {
            if (err) console.log(err);
            console.log("Role added successfully!"),
                questions();
        })
    })


const addEmployee = () =>
    inquirer.prompt([{
        type: "input",
        name: "firstEmpName",
        message: "What is the first name of the new employee?"
    },
    {
        type: "input",
        name: "lastEmpName",
        message: "What is the last name of the new employee?"
    },
    {
        type: "input",
        name: "empRole",
        message: "What is the role of the new employee going to be? 1: Supervisor, 2: Senior Developer, 3: Junior Developer, 4: Hiring Interviewer, 5: Data Scientist, 6: System Adminsartor"
    },
    {
        type: "input",
        name: "empManager",
        message: "What is the manager id of the new employee?"
    },
    ]).then(function (answers) {
        db.query("INSERT INTO Employee SET ?", {
            first_name: answers.firstEmpName,
            last_name: answers.lastEmpName,
            role_id: answers.empRole,
            manager_id: answers.empManager
        }, function (err) {
            if (err) throw err;
            console.log("Employee added succesfully!");
            questions();
        })
    });

figlet.text('Welcome to Employee Tracker',
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

setTimeout(questions, 1000);