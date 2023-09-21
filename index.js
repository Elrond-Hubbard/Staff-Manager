const inquirer = require("inquirer");
const mysql = require("mysql2");
const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "FistOf5",
    database: "staff_db",
  },
  console.log(`Connected to the staff_db database.`)
);
module.exports = db;
// The 
const staffManager = require("./lib/prompts");
const SQL = require('./lib/sql_utils')


function init() {
  inquirer.prompt(staffManager.options).then((answers) => {
    // ADD A DEPARTMENT
    if (answers.option === "addDepartment") {
      inquirer.prompt(staffManager.newDeps).then((answers) => {
        SQL.insertValue('departments', 'name', answers.newDepartment)
        init();
      });
    //   ADD A ROLE
    } else if (answers.option === "addRole") {
      inquirer.prompt(staffManager.newRole).then((answers) => {
        roleList.push(answers.newRoleName);
        console.log(answers);
        init();
      });
    //   ADD AN EMPLOYEE
    } else if (answers.option === "addEmployee") {
      inquirer.prompt(staffManager.newEmp).then((answers) => {
        employees.push(`${answers.newEmpName} ${answers.newEmpLast}`);
        console.log(answers);
        init();
      });
    //   UPDATE EMPLOYEE ROLE
    } else if (answers.option === "updateEmployee") {
      inquirer.prompt(staffManager.updateEmp).then((answers) => {
        console.log(answers);
        init();
      });
    //   SHOW ALL DEPARTMENTS
    } else if (answers.option === "DEPARTMENTS") {
      SQL.getTable('departments')
      init();
    //   SHOW ALL ROLES
    } else if (answers.option === "ROLES") {
      SQL.getTable('roles')
      init();
    //   SHOW ALL EMPLOYEES
    } else if (answers.option === "EMPLOYEES") {
      SQL.getTable('employees')
      init();
    }
  });
}
init();