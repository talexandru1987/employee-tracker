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

const addDepartment = async () => {
  // prompt question
  const questions = [
    {
      type: "confirm",
      message: "Do you want continue with adding a department?",
      name: "confirmAdd",
      default: false,
    },
    {
      type: "input",
      message: "Please enter the department name",
      name: "department",
      when(answers) {
        return answers.confirmAdd;
      },
      validate(answer) {
        if (!answer) {
          return "Department cannot be blank";
        }
        return true;
      },
    },
  ];
  const { department, confirmAdd } = await inquirer.prompt(questions);

  return { department, confirmAdd };
};

const addRole = async (departmentArray) => {
  // prompt question
  const questions = [
    {
      type: "confirm",
      message: "Do you want continue with adding a role?",
      name: "confirmAdd",
      default: false,
    },
    {
      type: "input",
      message: "Please enter the role title",
      name: "roleTitle",
      when(answers) {
        return answers.confirmAdd;
      },
      validate(answer) {
        if (!answer) {
          return "Title cannot be blank";
        }
        return true;
      },
    },
    {
      type: "input",
      message: "Please enter the salary for the role",
      name: "roleSalary",
      when(answers) {
        return answers.confirmAdd;
      },
      validate(answer) {
        if (!answer) {
          return "Salary cannot be blank";
        }
        return true;
      },
    },
    {
      type: "rawlist",
      message: "Please select the department for the new role",
      name: "department",
      when(answers) {
        return answers.confirmAdd;
      },
      choices: departmentArray,
    },
  ];
  const { confirmAdd, roleTitle, roleSalary, department } = await inquirer.prompt(questions);

  return { confirmAdd, roleTitle, roleSalary, department };
};

const addEmployee = async (roleArray, managerArray) => {
  // prompt question
  const questions = [
    {
      type: "confirm",
      message: "Do you want continue with adding an Employee?",
      name: "confirmAdd",
      default: false,
    },
    {
      type: "input",
      message: "Please enter first name",
      name: "firstName",
      when(answers) {
        return answers.confirmAdd;
      },
      validate(answer) {
        if (!answer) {
          return "First Name cannot be blank";
        }
        return true;
      },
    },
    {
      type: "input",
      message: "Please enter last name",
      name: "lastName",
      when(answers) {
        return answers.confirmAdd;
      },
      validate(answer) {
        if (!answer) {
          return "Last name cannot be blank";
        }
        return true;
      },
    },
    {
      type: "rawlist",
      message: "Please select the employee's role",
      name: "role",
      when(answers) {
        return answers.confirmAdd;
      },
      choices: roleArray,
    },
    {
      type: "rawlist",
      message: "Please select the employee's manager",
      name: "manager",
      when(answers) {
        return answers.confirmAdd;
      },
      choices: managerArray,
    },
  ];
  const { confirmAdd, firstName, lastName, role, manager } = await inquirer.prompt(questions);

  return { confirmAdd, firstName, lastName, role, manager };
};

const updateEmployeeRole = async (employeeArray, roleArray) => {
  // prompt question
  const questions = [
    {
      type: "confirm",
      message: "Do you want continue with updating an Employee?",
      name: "confirmAdd",
      default: false,
    },

    {
      type: "rawlist",
      message: "Please select the employee you want to update",
      name: "employee",
      when(answers) {
        return answers.confirmAdd;
      },
      choices: employeeArray,
    },
    {
      type: "rawlist",
      message(answers) {
        return `Please select ${answers.employee}'s  new role`;
      },
      name: "role",
      when(answers) {
        return answers.confirmAdd;
      },
      choices: roleArray,
    },
  ];
  const { confirmAdd, employee, role } = await inquirer.prompt(questions);

  return { confirmAdd, employee, role };
};

const updateEmployeeManager = async (employeeArray, managerArray) => {
  // prompt question
  const questions = [
    {
      type: "confirm",
      message: "Do you want continue with updating an Employee?",
      name: "confirmAdd",
      default: false,
    },

    {
      type: "rawlist",
      message: "Please select the employee you want to update",
      name: "employee",
      when(answers) {
        return answers.confirmAdd;
      },
      choices: employeeArray,
    },
    {
      type: "rawlist",
      message(answers) {
        return `Please select ${answers.employee}'s  new manager`;
      },
      name: "manager",
      when(answers) {
        return answers.confirmAdd;
      },
      choices: managerArray,
    },
  ];
  const { confirmAdd, employee, manager } = await inquirer.prompt(questions);

  return { confirmAdd, employee, manager };
};

module.exports = {
  journey,
  addDepartment,
  addRole,
  addEmployee,
  updateEmployeeRole,
  updateEmployeeManager,
};
