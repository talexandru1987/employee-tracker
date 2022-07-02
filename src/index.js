//import the env package
require("dotenv").config();

//require the console table
const cTable = require("console.table");

//import the questions
const {
  journey,
  addDepartment,
  addRole,
  addEmployee,
  updateEmployeeRole,
  updateEmployeeManager,
  deleteRecordOption,
  deleteRecord,
} = require("./utils/questions");

//import sql statements
const {
  selectAll,
  selectDepartmentEmployees,
  selectAllEmployees,
  selectManagerEmployees,
  selectDepartmentBudget,
  addAdepartment,
  maxId,
  addArole,
  specificDepartment,
  employeeByRole,
  addAnEmployee,
  updateEmployeeDetails,
  deleteAnOption,
  selectAllRoles,
} = require("./utils/utils");

//import the database file
const initDatabase = require("./db");

const init = async () => {
  //code to render ask the questions and add to database
  try {
    //connect to the database
    const { executeQuery, closeConnection } = await initDatabase({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });

    let inProgress = true;
    //execute the navigate database loop
    while (inProgress) {
      //start the initial questions
      let selectedJourney = await journey();
      //check the selection an continue
      if (selectedJourney.journey === "View all departments") {
        //get data
        const dataDepartments = await executeQuery(selectAll("department"));
        //show data
        console.table(dataDepartments);
      } else if (selectedJourney.journey === "View all roles") {
        //get data
        const dataRoles = await executeQuery(
          selectAllRoles(
            "role e, department d",
            "e.id, e.title, e.salary, d.name as department",
            "e.title"
          )
        );
        //show data
        console.table(dataRoles);
      } else if (selectedJourney.journey === "View all employees") {
        //get data
        const dataEmployees = await executeQuery(selectAllEmployees());
        //show data
        console.table(dataEmployees);
      } else if (selectedJourney.journey === "View employees by department") {
        //get data
        const dataDepartmentEmployees = await executeQuery(
          selectDepartmentEmployees(selectedJourney.department)
        );
        //show data
        console.table(dataDepartmentEmployees);
      } else if (selectedJourney.journey === "View employees by manager") {
        //get data
        const dataManagerEmployees = await executeQuery(
          selectManagerEmployees(selectedJourney.manager)
        );
        //show data
        console.table(dataManagerEmployees);
      } else if (selectedJourney.journey === "View utilized department budget") {
        //get data
        const dataDepartmentBudget = await executeQuery(
          selectDepartmentBudget(selectedJourney.budgetDepartment)
        );
        //show data
        console.table(dataDepartmentBudget);
      } else if (selectedJourney.journey === "Add a department") {
        //ask questions
        let addDepartments = await addDepartment();
        //get data
        if (addDepartments.confirmAdd) {
          //get the max id from table
          let departmentID = await executeQuery(maxId("department"));
          //insert the data
          const dataAddDepartment = await executeQuery(
            addAdepartment(departmentID[0].max + 1, addDepartments.department)
          );
          //show data
          if (dataAddDepartment.length !== 0) {
            console.table([{ Update: "Success" }]);
          }
        }
      } else if (selectedJourney.journey === "Add a role") {
        //get all departments
        let allDepartments = await executeQuery(selectAll("department"));
        //create the array of choices
        let choicesArray = [];
        const pushToArray = allDepartments.map((item) => choicesArray.push(item.name));
        //ask questions
        let addRoles = await addRole(choicesArray);
        //get data
        if (addRoles.confirmAdd) {
          //get the max id from table
          const roleID = await executeQuery(maxId("role"));
          //get the department id
          const idOfDepartment = await executeQuery(specificDepartment(addRoles.department));
          //insert the data
          const dataAddDepartmentRole = await executeQuery(
            addArole(
              roleID[0].max + 1,
              addRoles.roleTitle,
              addRoles.roleSalary,
              idOfDepartment[0].id
            )
          );
          //show data
          if (dataAddDepartmentRole.length !== 0) {
            console.table([{ Update: "Success" }]);
          }
        }
      } else if (selectedJourney.journey === "Add an employee") {
        //get all roles
        let allRoles = await executeQuery(selectAll("role"));
        //create the array of choices
        let rolesChoicesArray = [];
        const pushToRolesArray = allRoles.map((item) => rolesChoicesArray.push(item.title));
        //get all managers
        let allManagers = await executeQuery(employeeByRole("Manager"));
        //create the array of choices
        let managerChoicesArray = [];
        const pushToManagerArray = allManagers.map((item) =>
          managerChoicesArray.push(item.first_name)
        );

        //ask questions
        let addEmployees = await addEmployee(rolesChoicesArray, managerChoicesArray);
        //get data
        if (addEmployees.confirmAdd) {
          //get the max id from table
          const employeeID = await executeQuery(maxId("employee"));

          //get the manager id

          let aManagerId = allManagers.filter(
            (manager) => manager.first_name === addEmployees.manager
          )[0].id;

          //get the role id
          const aRoleId = allRoles.filter((role) => role.title === addEmployees.role)[0].id;
          //insert the data
          const dataAddEmployees = await executeQuery(
            addAnEmployee(
              employeeID[0].max + 1,
              addEmployees.firstName,
              addEmployees.lastName,
              aRoleId,
              aManagerId
            )
          );
          //show data
          if (dataAddEmployees.length !== 0) {
            console.table([{ Update: "Success" }]);
          }
        }
      } else if (selectedJourney.journey === "Update an employee's role") {
        //get all roles
        const allRoles = await executeQuery(selectAll("role"));
        //create the array of choices
        let rolesChoicesArray = [];
        const pushToRolesArray = allRoles.map((item) => rolesChoicesArray.push(item.title));
        //get all employees
        let allEmployees = await executeQuery(selectAll("employee"));
        //create the array of choices
        let employeeChoicesArray = [];
        const pushToEmployeeArray = allEmployees.map((item) =>
          employeeChoicesArray.push(item.first_name)
        );
        //ask questions
        let updateEmployeeRoles = await updateEmployeeRole(employeeChoicesArray, rolesChoicesArray);
        //get data
        if (updateEmployeeRoles.confirmAdd) {
          //get the employee id
          const anEmployeeId = allEmployees.filter(
            (employee) => employee.first_name === updateEmployeeRoles.employee
          )[0].id;
          //get the role id
          const aRoleId = allRoles.filter((role) => role.title === updateEmployeeRoles.role)[0].id;
          //insert the data
          const updateEmployeeData = await executeQuery(
            updateEmployeeDetails("role_id", aRoleId, anEmployeeId)
          );
          //show data
          if (updateEmployeeData.length !== 0) {
            console.table([{ Update: "Success" }]);
          }
        }
      } else if (selectedJourney.journey === "Update an employee's manager") {
        //get all managers
        const allManagers = await executeQuery(employeeByRole("Manager"));
        //create the array of choices
        let managerChoicesArray = [];
        const pushToManagerArray = allManagers.map((item) =>
          managerChoicesArray.push(item.first_name)
        );
        //get all employees
        let allEmployees = await executeQuery(selectAll("employee"));
        //create the array of choices
        let employeeChoicesArray = [];
        const pushToEmployeeArray = allEmployees.map((item) =>
          employeeChoicesArray.push(item.first_name)
        );
        //ask questions
        let updateEmployeeManagers = await updateEmployeeManager(
          employeeChoicesArray,
          managerChoicesArray
        );
        //get data
        if (updateEmployeeManagers.confirmAdd) {
          //get the employee id
          const anEmployeeId = allEmployees.filter(
            (employee) => employee.first_name === updateEmployeeManagers.employee
          )[0].id;
          //get the manager id

          let aManagerId = allManagers.filter(
            (manager) => manager.first_name === updateEmployeeManagers.manager
          )[0].id;
          //insert the data
          const updateEmployeeData = await executeQuery(
            updateEmployeeDetails("manager_id", aManagerId, anEmployeeId)
          );
          //show data
          if (updateEmployeeData.length !== 0) {
            console.table([{ Update: "Success" }]);
          }
        }
      } else if (selectedJourney.journey === "Delete options") {
        //ask questions
        let deleteOptions = await deleteRecordOption();

        if (deleteOptions.confirmAdd) {
          if (deleteOptions.deleteOption === "Department") {
            //get all departments
            let allDepartments = await executeQuery(selectAll("department"));
            //create the array of choices
            let choicesArray = [];
            const pushToArray = allDepartments.map((item) => choicesArray.push(item.name));
            //ask  questions
            const deleteQuestions = await deleteRecord(deleteOptions.deleteOption, choicesArray);
            if (deleteQuestions.confirmDelete) {
              const deleteTheSelection = await executeQuery(
                deleteAnOption("department", "name", deleteQuestions.deleteRecord)
              );
              //show data
              if (deleteTheSelection.length !== 0) {
                console.table([{ Update: "Success" }]);
              }
            }
          } else if (deleteOptions.deleteOption === "Role") {
            //get all roles
            let allRoles = await executeQuery(selectAll("role"));
            //create the array of choices
            let rolesChoicesArray = [];
            const pushToRolesArray = allRoles.map((item) => rolesChoicesArray.push(item.title));
            //ask  questions
            const deleteQuestions = await deleteRecord(
              deleteOptions.deleteOption,
              rolesChoicesArray
            );
            if (deleteQuestions.confirmDelete) {
              const deleteTheSelection = await executeQuery(
                deleteAnOption("role", "title", deleteQuestions.deleteRecord)
              );
              //show data
              if (deleteTheSelection.length !== 0) {
                console.table([{ Update: "Success" }]);
              }
            }
          } else if (deleteOptions.deleteOption === "Employee") {
            //get all employees
            let allEmployees = await executeQuery(selectAll("employee"));
            //create the array of choices
            let employeeChoicesArray = [];
            const pushToEmployeeArray = allEmployees.map((item) =>
              employeeChoicesArray.push(item.first_name)
            );

            //ask  questions
            const deleteQuestions = await deleteRecord(
              deleteOptions.deleteOption,
              employeeChoicesArray
            );
            if (deleteQuestions.confirmDelete) {
              //get the employee id
              const anEmployeeId = allEmployees.filter(
                (employee) => employee.first_name === deleteQuestions.deleteRecord
              )[0].id;
              //delete
              const deleteTheSelection = await executeQuery(
                deleteAnOption("employee", "id", anEmployeeId)
              );
              //show data
              if (deleteTheSelection.length !== 0) {
                console.table([{ Update: "Success" }]);
              }
            }
          }
        }
      }

      if (selectedJourney.journey === "Quit") {
        inProgress = false;
      }
    }

    //stop application
    process.exit();
  } catch (error) {
    console.log(`[ERROR]: Internal error | ${error.message}`);
  }
};
init();
