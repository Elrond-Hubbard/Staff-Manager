const departmentList = ["Engineering", "Finance", "Legal"];
const roleList = ["Sales Lead", "Software Engineer", "Account Manager"];
const managers = ["Allen Summers", "Jay Li", "Mandy Bryant"];
const employees = ["Billy Harland", "Sarah Shover", "Ricky Cotelesse"];

const options = [
  {
    type: "list",
    message: "What would you like to do?",
    name: "option",
    choices: [
      { name: "View All Departments", value: "DEPARTMENTS" },
      { name: "View All Roles", value: "ROLES" },
      { name: "View All Employees", value: "EMPLOYEES" },
      { name: "Add Department", value: "addDepartment" },
      { name: "Add Role", value: "addRole" },
      { name: "Add Employee", value: "addEmployee" },
      { name: "Update Employee Role", value: "updateEmployee" },
    ],
  },
];

const newDeps = [
  {
    type: "input",
    message: "What is the name of the department?",
    name: "newDepartment",
  },
];

const newRole = [
  {
    type: "input",
    message: "What is the name of the role?",
    name: "newRoleName",
  },
  {
    type: "input",
    message: "What is the salary of the role?",
    name: "newRoleSalary",
  },
  {
    type: "list",
    message: "Which department does the role belong to?",
    name: "newRoleDepartment",
    choices: departmentList,
  },
];

const newEmp = [
  {
    type: "input",
    message: "What is the employee's first name?",
    name: "newEmpName",
  },
  {
    type: "input",
    message: "What is the employee's last name?",
    name: "newEmpLast",
  },
  {
    type: "list",
    message: "What is the employee's role?",
    name: "newEmpRole",
    choices: roleList,
  },
  {
    type: "list",
    message: "Who is the employee's manager?",
    name: "newEmpBoss",
    choices: managers,
  },
];

const updateEmp = [
  {
    type: "list",
    message: "Which employee's role do you want to update?",
    name: "updateEmp",
    choices: employees,
  },
  {
    type: "list",
    message: "Which role do you want to assign the selected employee?",
    name: "updateEmpRole",
    choices: roleList,
  },
];

module.exports = { options, newDeps, newRole, newEmp, updateEmp, departmentList, roleList, employees };
