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
const prompts = require("./lib/prompts");
const getTable = require('./lib/sql_utils')

function init() {
  inquirer.prompt(prompts.options).then((answers) => {
    if (answers.option === "addDepartment") {
      inquirer.prompt(prompts.newDeps).then((answers) => {
        departmentList.push(answers.newDepartment);
        console.log(`Added ${answers.newDepartment}`);
        init();
      });
    } else if (answers.option === "addRole") {
      inquirer.prompt(prompts.newRole).then((answers) => {
        roleList.push(answers.newRoleName);
        console.log(answers);
        init();
      });
    } else if (answers.option === "addEmployee") {
      inquirer.prompt(prompts.newEmp).then((answers) => {
        employees.push(`${answers.newEmpName} ${answers.newEmpLast}`);
        console.log(answers);
        init();
      });
    } else if (answers.option === "updateEmployee") {
      inquirer.prompt(prompts.updateEmp).then((answers) => {
        console.log(answers);
        init();
      });
    } else if (answers.option === "DEPARTMENTS") {
      getTable('departments')
      init();
    } else if (answers.option === "ROLES") {
      getTable('roles')
      init();
    } else if (answers.option === "EMPLOYEES") {
      getTable('employees')
      init();
    }
  });
}
init();