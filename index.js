const inquirer = require("inquirer");
const options = require("./lib/prompts");

function init() {
  inquirer.prompt(options).then((answers) => {
    console.log(`You have selected ${answers.option}`);
  });
}
init()