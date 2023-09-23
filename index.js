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
      SQL.promiseList("departments", "name")
        .then((results) => {
          staffManager.newRole[2].choices = results;
          return inquirer.prompt(staffManager.newRole);
        })
        .then((answers) => {
          SQL.insertRole(
            answers.newRoleName,
            answers.newRoleSalary,
            answers.newRoleDepartment
          );
          init();
        });
    }
    // ADD AN EMPLOYEE
    if (answers.option === "addEmployee") {
      SQL.promiseList("roles", "title").then((results) => {
        staffManager.newEmp[2].choices = results;
      });
      SQL.promiseList("employees", "CONCAT (first_name, ' ', last_name)")
        .then((results) => {
          staffManager.newEmp[3].choices = results;
          return inquirer.prompt(staffManager.newEmp);
        })
        .then((answers) => {
          SQL.insertEmployee(
            answers.newEmpName,
            answers.newEmpLast,
            answers.newEmpRole,
            answers.newEmpBoss
          );
          init();
        });
    }
    // UPDATE AN EMPLOYEE
    if (answers.option === "updateEmployee") {
      SQL.promiseList("employees", "CONCAT (first_name, ' ', last_name)").then((results) => {
        staffManager.updateEmp[0].choices = results;
      });
      SQL.promiseList("roles", "title")
        .then((results) => {
          staffManager.updateEmp[1].choices = results;
          return inquirer.prompt(staffManager.updateEmp);
        })
        .then((answers) => {
          SQL.updateEmployee(answers.updateEmpName, answers.updateEmpRole);
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
      SQL.showRoles()
      init();
    }
    // VIEW ALL EMPLOYEES
    if (answers.option === "EMPLOYEES") {
      SQL.showEmployees();
      init();
    }
  });
}

init();
