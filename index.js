const inquirer = require('inquirer');
const table = require('console.table');
const mysql = require('mysql2');
const figlet = require('figlet');
const gradient = require('gradient-string');
require('dotenv').config();
// Using a dotenv to protect vital server information!
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

// Start of inquirer prompts
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

// View Functions
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
    const sql = `SELECT * FROM Employee INNER JOIN Role ON Employee.role_id = Role.id INNER JOIN Department ON Role.department_id = Department.id `;
    db.query(sql, (err, res) => {
        if (err) console.log(err);
        console.log("This is a list of all our current employees:");
        console.table(res);
        questions();
    })
}

const viewByManager = () => {
    const sql = `SELECT CONCAT(e.first_name , ' ' , e.last_name) AS employee, 
    CONCAT(m.first_name , ' ' , m.last_name) AS manager 
    FROM Employee e 
    LEFT JOIN Employee m ON m.id = e.manager_id 
    ORDER BY manager`;
    db.query(sql, (err, res) => {
        if (err) console.log(err);
        console.log("This is a list of all our current employees and their managers:");
        console.table(res);
        questions();
    })
}
// Add Functions
const addDepartment = () =>
    inquirer.prompt([{
        type: "input",
        name: "addedDep",
        message: "What is the name of the new department?"
    }]).then(answers => {
        let sql = "INSERT INTO Department (Department.title) VALUES (?)"
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


const addEmployee = () => {


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
        message: "What is the role of the new employee going to be? 1: CEO, 2: Paralegal, 3: IT Director, 4: Senior Accountant, 5: PR Representative, 6: HR Manager, 7:Chief Legal Counsel, 8: PR Manager, 9: Junior Software Developer"
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
    })
};
// Update functions
const updateEmployeeManagers = () => {
    let sql = "SELECT Employee.id, Employee.first_name, Employee.last_name, Employee.manager_id FROM Employee";
    db.query(sql, (err, res) => {
        if (err) console.log(err);
        let employeeNamesArray = [];
        res.forEach((Employee) => { employeeNamesArray.push(`${Employee.first_name} ${Employee.last_name}`); })

        inquirer.prompt([
            {
                type: "list",
                name: "chosenEmployee",
                message: "Which employee would you like to update?",
                choices: employeeNamesArray
            },
            {
                name: 'newManager',
                type: 'list',
                message: "Who is their new manager?",
                choices: employeeNamesArray
            }
        ]).then((answers) => {
            let employeeId, managerId;
            res.forEach((Employee) => {
                if (answers.chosenEmployee === `${Employee.first_name} ${Employee.last_name}`) {
                    employeeId = Employee.id;
                }

                if (answers.newManager === `${Employee.first_name} ${Employee.last_name}`) {
                    managerId = Employee.id;
                }
            });

            let sql = "UPDATE Employee SET Employee.manager_id = ? WHERE Employee.id = ?";

            db.query(sql,
                [managerId, employeeId],
                (err) => {
                    if (err) console.log(err);
                    console.log("The employee's manager has been updated!")
                    questions();
                });
        });
    });
};
// Delete Functions
const deleteDepartment = () => {
    let sql = "SELECT Department.id, Department.title FROM Department";
    db.query(sql, (err, res) => {
        let departmentTitlesArray = [];
        res.forEach((Department) => { departmentTitlesArray.push(`${Department.id} ${Department.title}`); })

        inquirer.prompt([{
            type: "list",
            name: "chosenDepartment",
            message: "Which department would you like to delete?",
            choices: departmentTitlesArray
        }
        ]).then((answers) => {
            let departmentId;
            res.forEach((Department) => {
                if (answers.chosenDepartment === `${Department.id} ${Department.title}`) {
                    departmentId = Department.id;
                }
            });
            let sql = "DELETE FROM Department WHERE Department.id = ?"

            db.query(sql, departmentId, (err) => {
                if (err) console.log(err);
                console.log("The department has been successfully deleted!")
                questions();
            })
        });
    });
}


const deleteRole = () => {
    let sql = "SELECT Role.id, Role.title FROM Role";
    db.query(sql, (err, res) => {
        let roleTitlesArray = [];
        res.forEach((Role) => { roleTitlesArray.push(`${Role.id} ${Role.title}`); })

        inquirer.prompt([{
            type: "list",
            name: "chosenRole",
            message: "Which role would you like to delete?",
            choices: roleTitlesArray
        }
        ]).then((answers) => {
            let roleId;
            res.forEach((Role) => {
                if (answers.chosenRole === `${Role.id} ${Role.title}`) {
                    roleId = Role.id;
                }
            });
            let sql = "DELETE FROM Role WHERE Role.id = ?"
            db.query(sql, roleId, (err) => {
                if (err) console.log(err);
                console.log("The role has been successfully deleted!")
                questions();
            })
        })
    });
}


const deleteEmployee = () => {
    let sql = "SELECT Employee.id, Employee.first_name, Employee.last_name FROM Employee";
    db.query(sql, (err, res) => {
        let employeeNameArray = [];
        res.forEach((Employee) => { employeeNameArray.push(`${Employee.id} ${Employee.first_name} ${Employee.last_name}`); })

        inquirer.prompt([{
            type: "list",
            name: "chosenEmployee",
            message: "Which employee would you like to delete?",
            choices: employeeNameArray
        }
        ]).then((answers) => {
            let employeeId;
            res.forEach((Employee) => {
                if (answers.chosenEmployee === `${Employee.id} ${Employee.first_name} ${Employee.last_name}`) {
                    employeeId = Employee.id;
                }
            });
            let sql = "DELETE FROM Employee WHERE Employee.id = ?";
            db.query(sql,
                employeeId,
                (err) => {
                    if (err) console.log(err);
                    console.log("The employee has been deleted!")
                    questions();
                });
        })
    });
}
// Figlet function for the splash screen 
figlet.text('Employee Tracker',
    {
        font: 'big',
        horizontalLayout: 'default',
        verticalLayout: 'default',
    }, function (err, data) {
        if (err) {
            console.log('Something went wrong!');
            console.dir(err);
            return;
        }
        console.log(gradient.retro.multiline(data));
    });

setTimeout(questions, 1000);