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
    // VIEW ALL DEPARTMENTS
    if (answers.option === "DEPARTMENTS") {
      SQL.showDepartment().then(() => init());
    }
    // VIEW ALL ROLES
    if (answers.option === "ROLES") {
      SQL.showRoles().then(() => init());
    }
    // VIEW ALL EMPLOYEES
    if (answers.option === "EMPLOYEES") {
      SQL.showEmployees().then(() => init());
    }
    // VIEW DEPARTMENT BUDGET
    if (answers.option === "viewBudget") {
      // The database is queried for a list of departments
      SQL.promiseList("departments", "name")
        // results of the query are returned
        .then((results) => {
          // and passed into the prompt's choices array
          staffManager.viewBudget[0].choices = results;
          return inquirer.prompt(staffManager.viewBudget);
        })
        .then((answers) => {
          SQL.showBudget(answers.depBudget).then(() => init());
        });
    }
    // ADD A DEPARTMENT
    if (answers.option === "addDepartment") {
      inquirer.prompt(staffManager.newDeps).then((answers) => {
        SQL.insertValue("departments", "name", answers.newDepartment).then(() =>
          init()
        );
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
          ).then(() => init());
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
          ).then(() => init());
        });
    }
    // UPDATE EMPLOYEE ROLE
    if (answers.option === "updateEmployee") {
      SQL.promiseList("employees", "CONCAT (first_name, ' ', last_name)").then(
        (results) => {
          staffManager.updateEmp[0].choices = results;
        }
      );
      SQL.promiseList("roles", "title")
        .then((results) => {
          staffManager.updateEmp[1].choices = results;
          return inquirer.prompt(staffManager.updateEmp);
        })
        .then((answers) => {
          SQL.updateEmployee(answers.updateEmpName, answers.updateEmpRole).then(
            () => init()
          );
        });
    }
    // UPDATE EMPLOYEE MANAGER
    if (answers.option === "updateBoss") {
      SQL.promiseList("employees", "CONCAT (first_name, ' ', last_name)")
        .then((results) => {
          staffManager.updateBoss[0].choices = results;
          staffManager.updateBoss[1].choices = results;
          return inquirer.prompt(staffManager.updateBoss);
        })
        .then((answers) => {
          SQL.updateManager(answers.empId, answers.bossId).then(() => init());
        });
    }
  });
}

init();
