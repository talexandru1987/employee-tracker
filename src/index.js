//import the env package
require("dotenv").config();

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
  selectManagerEmployees,
  selectDepartmentBudget,
  addAdepartment,
  maxId,
  addArole,
  specificDepartment,
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

    //let addEmployees = await addEmployee(["IT", "HR"], ["Alex", "Raluca"]);
    //let updateEmployeesRole = await updateEmployeeRole(["Steve", "Bob"], ["Alex", "Raluca"]);
    //let updateEmployeesManager = await updateEmployeeManager(["Steve", "Bob"], ["Alex", "Raluca"]);
    //let deleteRecordOptions = await deleteRecordOption();
    //let deleteRecords = await deleteRecord("department", ["IT", "HR", "Finance"]);

    while (inProgress) {
      //start the initial questions
      let selectedJourney = await journey();
      //check the selection an continue
      if (selectedJourney.journey === "View all departments") {
        //get data
        const dataDepartments = await executeQuery(selectAll("department"));
        //show data
        console.log(dataDepartments);
      } else if (selectedJourney.journey === "View all roles") {
        //get data
        const dataRoles = await executeQuery(selectAll("role"));
        //show data
        console.log(dataRoles);
      } else if (selectedJourney.journey === "View all employees") {
        //get data
        const dataEmployees = await executeQuery(selectAll("employee"));
        //show data
        console.log(dataEmployees);
      } else if (selectedJourney.journey === "View employees by department") {
        //get data
        const dataDepartmentEmployees = await executeQuery(
          selectDepartmentEmployees(selectedJourney.department)
        );
        //show data
        console.log(dataDepartmentEmployees);
      } else if (selectedJourney.journey === "View employees by manager") {
        //get data
        const dataDepartmentEmployees = await executeQuery(
          selectManagerEmployees(selectedJourney.manager)
        );
        //show data
        console.log(dataDepartmentEmployees);
      } else if (selectedJourney.journey === "View utilized department budget") {
        //get data
        const dataDepartmentEmployees = await executeQuery(
          selectDepartmentBudget(selectedJourney.budgetDepartment)
        );
        //show data
        console.log(dataDepartmentEmployees);
      } else if (selectedJourney.journey === "Add a department") {
        //ask questions
        let addDepartments = await addDepartment();
        //get data
        if (addDepartments.confirmAdd) {
          //get the max id from table
          let departmentID = await executeQuery(maxId("department"));
          //insert the data
          const dataDepartmentEmployees = await executeQuery(
            addAdepartment(departmentID[0].max + 1, addDepartments.department)
          );
          //show data
          console.log(dataDepartmentEmployees);
        }
      } else if (selectedJourney.journey === "Add a role") {
        //get all roles
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
          const dataDepartmentEmployees = await executeQuery(
            addArole(
              roleID[0].max + 1,
              addRoles.roleTitle,
              addRoles.roleSalary,
              idOfDepartment[0].id
            )
          );
          //show data
          console.log(dataDepartmentEmployees);
        }
      } else if (selectedJourney.journey === "Add a role") {
        //get all roles
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
          const dataDepartmentEmployees = await executeQuery(
            addArole(
              roleID[0].max + 1,
              addRoles.roleTitle,
              addRoles.roleSalary,
              idOfDepartment[0].id
            )
          );
          //show data
          console.log(dataDepartmentEmployees);
        }
      }

      //stop the loop during testing, DELETE after
      inProgress = false;
    }
  } catch (error) {
    console.log(`[ERROR]: Internal error | ${error.message}`);
  }
};
init();
