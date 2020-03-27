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
            viewAllEmployees();
        } else if (answers.choice === 'View All Employees by Department') {
            viewByDept();
        } else if (answers.choice === 'View All Employees by Role') {
            viewByRole();
        } else if (answers.choice === 'Add Employee') {
            addEmployee();
        }
    })

// SQL QUERY FUNCTIONS

function viewAllEmployees() {
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

function viewByDept() {
    inquirer.prompt([{
        message: "Which department would you like to view?",
        type: 'list',
        name: 'dept',
        choices: [
            'Engineering',
            'Management',
            'Marketing',
            'Legal',
            'Sales'
        ]
    }])
        .then((answers) => {
            connection.query(`SELECT 
            employee.first_name,
            employee.last_name,
            department.name AS Department
        FROM employee
            INNER JOIN role ON employee.role_id=role.role_id     
            INNER JOIN department ON employee.role_id=department.department_id
            WHERE department.name='${answers.dept}'`, (err, result) => {
                if (err) throw err;
                console.table(result);
            })
        })
}

function viewByManager() {

}

function viewByRole() {
    inquirer.prompt([{
        message: "Which roles would you like to view?",
        type: 'list',
        name: 'role',
        choices: [
            'Junior Developer',
            'Senior Developer',
            'Sales Lead',
            'Lawyer'
        ]
    }])
        .then((answers) => {
            connection.query(`SELECT 
            employee.first_name,
            employee.last_name,
            role.title AS Title
        FROM employee
            INNER JOIN role ON employee.role_id=role.role_id     
            INNER JOIN department ON employee.role_id=department.department_id
            WHERE role.title='${answers.role}'`, (err, result) => {
                if (err) throw err;
                console.table(result);
            })
        })
}

function addEmployee() {

    // Solution so far to be able to reference an index for when choosing an employee role
    roles = [
        'Junior Developer',
        'Senior Developer',
        'Sales Lead',
        'Lawyer'
    ];

    inquirer.prompt([
        {
            message: "What would be the employee's role?",
            type: 'list',
            name: 'role',
            choices: roles
        },
        {
            message: "What is the employees first name?",
            type: 'input',
            name: 'firstName',
        },
        {
            message: "What is the employees last name?",
            type: 'input',
            name: 'lastName',
        },

    ])
        .then((answers) => {

            connection.query(`
             INSERT INTO employee SET ?`,
                {
                    first_name: answers.firstName,
                    last_name: answers.lastName,
                    role_id: roles.indexOf(answers.role) + 1 // This line has to be an INT
                },

                (err, result) => {
                    if (err) throw err;
                    console.table(result);
                })
            console.log(answers.role);
        })
}

function updateEmployee() {

}

function removeEmployee() {

}

function viewRoles() {

}

function addRole() {

}

function updateRole() {

}

function deleteRole() {

}

function viewDepts() {

}

function addDept() {

}

function updateDept() {

}

function deleteDept() {

}

// SQL QUERY FUNCTIONS -- /END



