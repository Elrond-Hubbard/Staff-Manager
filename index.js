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

const staffManager = require("./lib/prompts");
const SQL = require("./lib/sql_utils");

function init() {
  inquirer.prompt(staffManager.options).then((answers) => {
    // ADD A DEPARTMENT
    if (answers.option === "addDepartment") {
      inquirer.prompt(staffManager.newDeps).then((answers) => {
        SQL.insertValue("departments", "name", answers.newDepartment);
        init();
      });
    }
    // ADD A ROLE
    if (answers.option === "addRole") {
      inquirer.prompt(staffManager.newRole).then((answers) => {
        console.table(answers);
        init();
      });
    }
    // ADD AN EMPLOYEE
    if (answers.option === "addEmployee") {
      inquirer.prompt(staffManager.newEmp).then((answers) => {
        console.table(answers);
        init();
      });
    }
    // UPDATE AN EMPLOYEE
    if (answers.option === "updateEmployee") {
      inquirer.prompt(staffManager.updateEmp).then((answers) => {
        console.table(answers);
        init();
      });
    }
    // VIEW ALL DEPARTMENTS
    if (answers.option === "DEPARTMENTS") {
      SQL.getTable("departments");
      init();
    }
    // VIEW ALL ROLES
    if (answers.option === "ROLES") {
      SQL.getTable("roles");
      init();
    }
    // VIEW ALL EMPLOYEES
    if (answers.option === "EMPLOYEES") {
      SQL.getTable("employees");
      init();
    }
  });
}

init();
