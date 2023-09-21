const db = require('../index')

function getTable(table) {
    db.query(`SELECT * FROM ${table}`, (err, results) => {
        console.log(results)
    })
}

module.exports = getTable