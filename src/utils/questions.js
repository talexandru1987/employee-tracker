const inquirer = require("inquirer");
//initial menu question
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
        "View employees by department",
        "View employees by manager",
        "View utilized department budget",
        new inquirer.Separator(),
        "Add a department",
        "Add a role",
        "Add an employee",
        new inquirer.Separator(),
        "Update an employee's role",
        "Update an employee's manager",
        "Delete options",
        "Quit",
      ],
    },
    {
      type: "input",
      message: "Please enter the department name",
      name: "department",
      when(answers) {
        return answers.journey === "View employees by department";
      },
      validate(answer) {
        if (!answer) {
          return "Department name cannot be blank";
        }
        return true;
      },
    },
    {
      type: "input",
      message: "Please enter the manager name",
      name: "manager",
      when(answers) {
        return answers.journey === "View employees by manager";
      },
      validate(answer) {
        if (!answer) {
          return "Manager name cannot be blank";
        }
        return true;
      },
    },
    {
      type: "input",
      message: "Please enter the department name",
      name: "budgetDepartment",
      when(answers) {
        return answers.journey === "View utilized department budget";
      },
      validate(answer) {
        if (!answer) {
          return "Department name cannot be blank";
        }
        return true;
      },
    },
  ];
  const { journey, department, manager, budgetDepartment } = await inquirer.prompt(questions);

  return { journey, department, manager, budgetDepartment };
};
//questions for adding a department
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
//questions for adding a role
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
//questions for adding an employee
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
//questions for update an employee's role
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
//questions for update an employee's manager
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
//questions for selecting the delete options
const deleteRecordOption = async () => {
  // prompt question
  const questions = [
    {
      type: "confirm",
      message: "Do you want continue with the delete option?",
      name: "confirmAdd",
      default: false,
    },

    {
      type: "rawlist",
      message: "Please select one of the following options",
      name: "deleteOption",
      when(answers) {
        return answers.confirmAdd;
      },
      choices: ["Department", "Role", "Employee"],
    },
  ];
  const { confirmAdd, deleteOption } = await inquirer.prompt(questions);

  return { confirmAdd, deleteOption };
};
//questions to get information needed to identify a record for delete
const deleteRecord = async (record, choicesArray) => {
  // prompt question
  const questions = [
    {
      type: "rawlist",
      message: `Please select the ${record} you wish to delete`,
      name: "deleteRecord",
      choices: choicesArray,
    },
    {
      type: "confirm",
      message(answers) {
        return `Are you sure you want to delete the ${record}: ${answers.deleteRecord} ?`;
      },
      name: "confirmDelete",
      default: false,
    },
  ];
  const { deleteRecord, confirmDelete } = await inquirer.prompt(questions);

  return { deleteRecord, confirmDelete };
};

module.exports = {
  journey,
  addDepartment,
  addRole,
  addEmployee,
  updateEmployeeRole,
  updateEmployeeManager,
  deleteRecordOption,
  deleteRecord,
};
