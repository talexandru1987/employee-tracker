const inquirer = require("inquirer");

const journey = async () => {
  // prompt question
  const questions = [
    {
      type: "input",
      message: "Please enter an office number",
      name: "officeNumber",
      validate(answer) {
        const emailRegex = /^[1-9]+[0-9]*$/;
        if (!emailRegex.test(answer)) {
          return "You have to provide a valid office number!";
        }
        return true;
      },
    },
  ];
  const { officeNumber } = await inquirer.prompt(questions);

  return { officeNumber };
};

module.exports = { journey };
