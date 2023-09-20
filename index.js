const inquirer = require("inquirer");
const {options, newDeps, newRole, newEmp, updateEmp} = require("./lib/prompts");
const {departmentList, roleList, employees} = require("./lib/prompts")

function init() {
  inquirer.prompt(options).then((answers) => {
    if (answers.option === "addDepartment") {
        inquirer.prompt(newDeps).then((answers) => {
            departmentList.push(answers.newDepartment)
            console.log(`Added ${answers.newDepartment}`)
            init()
        })
    } else if (answers.option === "addRole") {
        inquirer.prompt(newRole).then((answers) => {
            roleList.push(answers.newRoleName)
            console.log(answers)
            init()
        })
    } else if (answers.option === "addEmployee") {
        inquirer.prompt(newEmp).then((answers) => {
            employees.push(`${answers.newEmpName} ${answers.newEmpLast}`)
            console.log(answers)
            init()
        })
    } else if (answers.option === "updateEmployee") {
        inquirer.prompt(updateEmp).then((answers) => {
            console.log(answers)
            init()
        })
    } else if (answers.option === "DEPARTMENTS") {
        console.log(departmentList)
        init()
    } else if (answers.option === "ROLES") {
        console.log(roleList)
        init()
    } else if (answers.option === "EMPLOYEES") {
        console.log(employees)
        init()
    }
  });
}
init()