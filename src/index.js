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
    let selectedJourney = await journey();
    //let addDepartments = await addDepartment();
    //let addRoles = await addRole(["IT", "HR"]);
    //let addEmployees = await addEmployee(["IT", "HR"], ["Alex", "Raluca"]);
    //let updateEmployeesRole = await updateEmployeeRole(["Steve", "Bob"], ["Alex", "Raluca"]);
    //let updateEmployeesManager = await updateEmployeeManager(["Steve", "Bob"], ["Alex", "Raluca"]);
    //let deleteRecordOptions = await deleteRecordOption();
    //let deleteRecords = await deleteRecord("department", ["IT", "HR", "Finance"]);

    console.log(selectedJourney);
    while (inProgress) {
      // const departments = await executeQuery("SELECT * FROM department", (err, results, fields) => {
      //   console.log(err); // return errors if any
      //   console.log(results); // results contains rows returned by server
      //   console.log(fields); // fields contains extra meta data about results, if available
      // });

      //const departments = await executeQuery("SELECT * FROM department");

      //console.log(departments);

      //stop the loop during testing, DELETE after
      inProgress = false;
    }
  } catch (error) {
    console.log(`[ERROR]: Internal error | ${error.message}`);
  }
};
init();
