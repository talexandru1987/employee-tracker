//select all from a table
const selectAll = (aTable) => `SELECT * FROM ${aTable}`;

//select all roles
const selectAllRoles = (aTable, columns, aGroup) =>
  `SELECT ${columns} FROM ${aTable} GROUP BY ${aGroup}`;

//select all from a table
const selectAllEmployees =
  () => `SELECT e.id, e.first_name, e.last_name, r.title, d.name as department
FROM employee e 
JOIN employee e1 ON e1.id= e.id
JOIN role r ON  e.role_id = r.id
JOIN department d ON r.department_id = d.id`;

//select by department
const selectDepartmentEmployees = (aDepartment) => `SELECT * 
FROM employee e, department d, role r
WHERE e.role_id = r.id 
and  r.department_id = d.id
and d.name = '${aDepartment}'`;

// select by manager
const selectManagerEmployees = (managerId) => `SELECT * 
FROM employee_db.employee e, employee_db.role r
WHERE e.role_id = r.id 
and e.manager_id = '${managerId}'`;
//select department budget
const selectDepartmentBudget = (aDepartment) => `SELECT sum(salary)
FROM employee e, department d, role r
WHERE e.role_id = r.id 
and  r.department_id = d.id
and d.name = '${aDepartment}'`;

//add department
const addAdepartment = (anId, aName) =>
  `INSERT INTO department (id, name) VALUES ('${anId}', '${aName}')`;

// get max id
const maxId = (aDepartment) => `SELECT max(id) as max FROM ${aDepartment}`;

//add role
const addArole = (anId, aTitle, aSalary, aDepartment_id) =>
  `INSERT INTO role (id, title, salary, department_id) VALUES ('${anId}', '${aTitle}','${aSalary}','${aDepartment_id}')`;

//get specific department if
const specificDepartment = (aDepartment) =>
  `SELECT id FROM department WHERE name = '${aDepartment}'`;

//get all employees by role
const employeeByRole = (aRole) => `SELECT e.id, first_name 
  FROM employee e, role r
  WHERE e.role_id = r.id 
  and r.title = '${aRole}';`;

//add an employee
const addAnEmployee = (anId, fName, lName, rId, mId) =>
  `INSERT INTO employee (id, first_name, last_name, role_id, manager_id) VALUES ('${anId}', '${fName}','${lName}','${rId}','${mId}')`;

//update an employee role
const updateEmployeeDetails = (aColumn, aValue, anId) =>
  `UPDATE employee SET ${aColumn} = '${aValue}' WHERE id = '${anId}'`;

const deleteAnOption = (aTable, aValue, anId) =>
  `DELETE FROM ${aTable} WHERE ${aValue} = '${anId}'`;

module.exports = {
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
};
