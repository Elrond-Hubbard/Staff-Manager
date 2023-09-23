const db = require("../index");

const SQL = {
  getTable(table) {
    db.query(`SELECT * FROM ${table}`, (err, results) => {
      console.log(`...`);
      console.table(results);
    });
  },

  insertValue(table, column, value) {
    db.query(
      `INSERT INTO ${table} (${column}) VALUES ("${value}");`,
      (err, results) => {
        console.log(`...`);
        console.table(results);
      }
    );
  },

  insertRole(title, salary, depId) {
    db.query(
      `INSERT INTO roles (title, salary, department_id) VALUES ('${title}', ${salary}, ${depId})`,
      (err, results) => {
        console.log(err)
        console.log(`...`);
        console.table(results);
      }
    );
  },

  // A promise within a promise
  promiseList(table, column) {
    return new Promise((resolve, reject) => {
      db.promise()
        .query(`SELECT ${column} AS name, id AS value FROM ${table}`)
        .then(([rows, fields]) => {
          // When New Promise is resolved, return rows.
          resolve(rows);
        })
        .catch((err) => reject(err));
    });
  },

  logList(table, column) {
    db.query(`SELECT ${column}, id AS value FROM ${table}`, (err, results) => {
      console.log(results);
    });
  },
};

module.exports = SQL;
