const inquirer = require('inquirer');
const mysql = require('mysql');
const consoleTable = require('console.table');


const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: "root",
    password: "root",
    database: "employee_DB"
})

connection.connect((err) => {
    if (err) {
        console.error(`error connecting`, err.stack);
        return
    }
    console.log(`connected as id ${connection.threadId}`);
})

inquirer.prompt([{
    message: 'What would you like to do?',
    type: 'list',
    name: 'choice',
    choices: [
        'View All Employees',
        'View All Employees by Department',
        'View All Employees by Manager',
        'View All Employees by Role',
        'Add Employee',
        'Remove Employee',
        'Update Employee',
        'View All Roles',
        'Add Role',
        'Update Role',
        'Delete Role',
        'View All Departments',
        'Add Department',
        'Update Department',
        'Delete Department'
    ]
}])
    .then((answers) => {
        if (answers.choice === 'View All Employees') {
            connection.query(`SELECT employee.first_name, 
            employee.last_name,
            role.title AS Title,
            role.salary AS Salary,
            department.name AS Department
        FROM employee 
            INNER JOIN role ON employee.role_id=role.role_id
            INNER JOIN department ON employee.role_id=department.department_id`, (err, result) => {
                if (err) throw err;
                console.table(result);
            })
        }
    })

