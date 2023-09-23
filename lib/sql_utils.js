const db = require("../index");

// The SQL object contains methods for querying the database
const SQL = {

  getTable(table) {
    db.query(`SELECT * FROM ${table}`, (err, results) => {
      console.log(`...`);
      console.table(results);
    });
  },

  showEmployees() {
    db.query(
      `SELECT 
      CONCAT (employees.first_name, ' ', employees.last_name) AS name,
      roles.title AS role,
      roles.salary AS salary,
      managers.last_name AS manager
      FROM 
      employees
      JOIN roles ON employees.role_id = roles.id
      LEFT JOIN employees AS managers ON employees.manager_id = managers.id;`,
      (err, results) => {
        console.log("...");
        console.table(results);
      }
    );
  },

  showRoles() {
    db.query(
      `SELECT 
      roles.title AS role,
      roles.salary AS salary,
      departments.name AS department
      FROM roles
      JOIN departments ON roles.department_id = departments.id`,
      (err, results) => {
        console.log("...");
        console.table(results);
      }
    );
  },

  showBudget(depId) {
    db.query(
      `SELECT departments.name AS Department, SUM(roles.salary) AS Budget
      FROM employees
      JOIN roles ON employees.role_id = roles.id
      JOIN departments ON roles.department_id = departments.id
      WHERE departments.id = ${depId};`,
      (err, results) => {
        console.log("...");
        console.table(results);
      }
    );
  },

  insertValue(table, column, value) {
    db.query(
      `INSERT INTO ${table} (${column}) VALUES ("${value}");`,
      (err, results) => {
        console.log(`...`);
        console.log(`${value} inserted into ${table}!`)
        return results;
      }
    );
  },

  insertRole(title, salary, depId) {
    db.query(
      `INSERT INTO roles (title, salary, department_id) 
      VALUES ('${title}', ${salary}, ${depId})`,
      (err, results) => {
        console.log(`...`);
        console.log(`${title} added to roles!`)
        return results;
      }
    );
  },

  insertEmployee(firstName, lastName, roleId, bossId) {
    db.query(
      `INSERT INTO employees (first_name, last_name, role_id, manager_id) 
      VALUES ('${firstName}', '${lastName}', ${roleId}, ${bossId})`,
      (err, results) => {
        console.log("...");
        console.log(`${firstName} ${lastName} added to employees!`)
        return results;
      }
    );
  },

  updateEmployee(empId, roleId) {
    db.query(
      `UPDATE employees SET role_id = ${roleId} WHERE id = ${empId}`,
      (err, results) => {
        console.log("...");
        console.log(`Role updated!`)
        return results;
      }
    );
  },

  updateManager(empId, bossId) {
    db.query(
      `UPDATE employees SET manager_id = ${bossId} WHERE id = ${empId}`, 
      (err, results) => {
        console.log("...");
        console.log(`Manager updated!`)
      }
    )
  },


  promiseList(table, column) {
    // db.promise() is wrapped in a new Promise so the callback can be returned
    return new Promise((resolve, reject) => {
      db.promise()
        .query(`SELECT ${column} AS name, id AS value FROM ${table}`)
        .then(([rows, fields]) => {
          resolve(rows);
        })
        .catch((err) => reject(err));
    });
  },
};

module.exports = SQL;
