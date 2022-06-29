const inquirer = require("inquirer");

const journey = async () => {
  // prompt question
  const questions = [
    {
      type: "rawlist",
      message: "Please select one of the following options",
      name: "journey",
      choices: [
        "View all departments",
        "View all roles",
        "View all employees",
        new inquirer.Separator(),
        "Add a department",
        "Add a role",
        "Add an employee",
        new inquirer.Separator(),
        "Update an employee role",
        "Quit",
        new inquirer.Separator(),
      ],
    },
  ];
  const { journey } = await inquirer.prompt(questions);

  return { journey };
};

module.exports = { journey };
