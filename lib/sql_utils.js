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

//   TODO: Refactor this function so results are returned. Invoked
// function must output an array.
  returnList(table, column) {
    db.promise()
      .query(`SELECT ${column}, id AS value FROM ${table}`)
      .then(([rows, fields]) => {
        console.log("...");
        return rows;
      })
  },
};

module.exports = SQL;
