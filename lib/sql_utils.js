const db = require("../index");

const SQL = {
  getTable(table) {
    db.query(`SELECT * FROM ${table}`, (err, results) => {
      console.log(results);
    });
  },
  insertValue(table, column, value) {
    db.query(
      `INSERT INTO ${table} (${column}) VALUES ("${value}");`,
      (err, results) => {
        console.log(results);
      }
    );
  },
};

module.exports = SQL;
