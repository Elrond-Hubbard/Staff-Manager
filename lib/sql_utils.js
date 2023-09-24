const db = require("../index");

// The SQL object contains methods for querying the database
const SQL = {
  showDepartment() {
    return new Promise((resolve, reject) => {
      db.promise()
        .query(`SELECT name AS Department FROM departments`)
        .then(([rows, fields]) => {
          console.clear();
          console.table(rows);
          resolve(rows);
        });
    });
  },

  showEmployees() {
    return new Promise((resolve, reject) => {
      db.promise()
        .query(
          `SELECT 
          CONCAT (employees.first_name, ' ', employees.last_name) AS name,
          roles.title AS role,
          roles.salary AS salary,
          managers.last_name AS manager
          FROM 
          employees
          JOIN roles ON employees.role_id = roles.id
          LEFT JOIN employees AS managers ON employees.manager_id = managers.id;`
        )
        .then(([rows, fields]) => {
          console.clear();
          console.table(rows);
          resolve(rows);
        });
    });
  },

  showRoles() {
    return new Promise((resolve, reject) => {
      db.promise()
        .query(
          `SELECT 
          roles.title AS role,
          roles.salary AS salary,
          departments.name AS department
          FROM roles
          JOIN departments ON roles.department_id = departments.id`
        )
        .then(([rows, fields]) => {
          console.clear();
          console.table(rows);
          resolve(rows);
        });
    });
  },

  showBudget(depId) {
    return new Promise((resolve, reject) => {
      db.promise()
        .query(
          `SELECT departments.name AS Department, SUM(roles.salary) AS Budget
          FROM employees
          JOIN roles ON employees.role_id = roles.id
          JOIN departments ON roles.department_id = departments.id
          WHERE departments.id = ${depId};`
        )
        .then(([rows, fields]) => {
          console.clear();
          console.table(rows);
          resolve(rows);
        });
    });
  },

  insertValue(table, column, value) {
    return new Promise((resolve, reject) => {
      db.promise()
        .query(`INSERT INTO ${table} (${column}) VALUES ("${value}");`)
        .then(([rows, fields]) => {
          console.clear();
          console.log(`${value} inserted into ${table}!`);
          resolve(rows);
        });
    });
  },

  insertRole(title, salary, depId) {
    return new Promise((resolve, reject) => {
      db.promise()
        .query(
          `INSERT INTO roles (title, salary, department_id) 
          VALUES ('${title}', ${salary}, ${depId})`
        )
        .then(([rows, fields]) => {
          console.clear();
          console.log(`${title} added to roles!`);
          resolve(rows);
        });
    });
  },

  insertEmployee(firstName, lastName, roleId, bossId) {
    return new Promise((resolve, reject) => {
      db.promise()
        .query(
          `INSERT INTO employees (first_name, last_name, role_id, manager_id) 
          VALUES ('${firstName}', '${lastName}', ${roleId}, ${bossId})`
        )
        .then(([rows, fields]) => {
          console.clear();
          console.log(`${firstName} ${lastName} added to employees!`);
          resolve(rows);
        });
    });
  },

  updateEmployee(empId, roleId) {
    return new Promise((resolve, reject) => {
      db.promise()
        .query(`UPDATE employees SET role_id = ${roleId} WHERE id = ${empId}`)
        .then(([rows, fields]) => {
          console.clear();
          console.log(`Role updated!`);
          resolve(rows);
        });
    });
  },

  updateManager(empId, bossId) {
    return new Promise((resolve, reject) => {
      db.promise()
        .query(
          `UPDATE employees SET manager_id = ${bossId} WHERE id = ${empId}`
        )
        .then(([rows, fields]) => {
          console.clear();
          console.log(`Manager updated!`);
          resolve(rows);
        });
    });
  },

  promiseList(table, column) {
    // db.promise() is wrapped in a new Promise so the callback can be returned
    return new Promise((resolve, reject) => {
      db.promise()
        .query(`SELECT ${column} AS name, id AS value FROM ${table}`)
        .then(([rows, fields]) => {
          resolve(rows);
        });
    });
  },
};

module.exports = SQL;
