const db = require("../index");
const SQL = require("./sql_utils");

const staffManager = {
  options: [
    {
      type: "list",
      message: "What would you like to do?",
      name: "option",
      choices: [
        { name: "View All Departments", value: "DEPARTMENTS" },
        { name: "View All Roles", value: "ROLES" },
        { name: "View All Employees", value: "EMPLOYEES" },
        { name: "Add Department", value: "addDepartment" },
        { name: "Add Role", value: "addRole" },
        { name: "Add Employee", value: "addEmployee" },
        { name: "Update Employee Role", value: "updateEmployee" },
      ],
    },
  ],

  newDeps: [
    {
      type: "input",
      message: "What is the name of the department?",
      name: "newDepartment",
    },
  ],

  newRole: [
    {
      type: "input",
      message: "What is the name of the role?",
      name: "newRoleName",
    },
    {
      type: "input",
      message: "What is the salary of the role?",
      name: "newRoleSalary",
    },
    {
      type: "list",
      message: "Which department does the role belong to?",
      name: "newRoleDepartment",
      choices: []
    },
  ],

  newEmp: [
    {
      type: "input",
      message: "What is the employee's first name?",
      name: "newEmpName",
    },
    {
      type: "input",
      message: "What is the employee's last name?",
      name: "newEmpLast",
    },
    {
      type: "list",
      message: "What is the employee's role?",
      name: "newEmpRole",
      choices: [],
    },
    {
      type: "list",
      message: "Who is the employee's manager?",
      name: "newEmpBoss",
      choices: [],
    },
  ],

  updateEmp: [
    {
      type: "list",
      message: "Which employee's role do you want to update?",
      name: "updateEmp",
      choices: [],
    },
    {
      type: "list",
      message: "Which role do you want to assign the selected employee?",
      name: "updateEmpRole",
      choices: [],
    },
  ],
};

module.exports = staffManager;
