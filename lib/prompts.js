
const options = [{
    type: "list",
    message: "What would you like to do?",
    name: "option",
    choices: [
        {name: "View All Departments", value: "viewDepartments"},
        {name: "View All Roles", value: "viewRoles"},
        {name: "View All Employees", value: "viewEmployees"},
        {name: "Add Department", value: "addDepartment"},
        {name: "Add Role", value: "addRole"},
        {name: "Add Employee", value: "addEmployee"},
        {name: "Update Employee Roll", value: "updateEmployee"},
    ]
}]

module.exports = options