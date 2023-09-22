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
        console.log(results);
      }
    );
  },

  // A promise within a promise
  promiseList(table, column) {
    return new Promise((resolve, reject) => {
      db.promise()
        .query(`SELECT ${column}, id AS value FROM ${table}`)
        .then(([rows, fields]) => {
          // When Promise is resolved, return rows.
          resolve(rows);
        })
        .catch((err) => reject(err));
    });
  },
};

module.exports = SQL;
