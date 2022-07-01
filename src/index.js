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
const { selectAll, selectAllWhere } = require("./utils/utils");

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
    //let addDepartments = await addDepartment();
    //let addRoles = await addRole(["IT", "HR"]);
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
        //const dataDepartmentEmployees = await executeQuery(selectAllWhere("department", "IT"));
        console.log(selectedJourney.department);
        const dataDepartmentEmployees = await executeQuery(
          selectAllWhere(`SELECT * FROM department WHERE name = "IT"`)
        );
        //show data
        console.log(dataDepartmentEmployees);
      }

      //stop the loop during testing, DELETE after
      inProgress = false;
    }
  } catch (error) {
    console.log(`[ERROR]: Internal error | ${error.message}`);
  }
};
init();
