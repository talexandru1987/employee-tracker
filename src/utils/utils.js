//select all from a table
const selectAll = (table) => `SELECT * FROM ${table}`;

//select all roles
const selectAllRoles = (table, columns, aGroup) =>
  `SELECT ${columns} FROM ${table} GROUP BY ${aGroup}`;

//select all from a table
const selectAllEmployees =
  () => `SELECT e.id, e.first_name, e.last_name, r.title, d.name as department
FROM employee e 
JOIN employee e1 ON e1.id= e.id
JOIN role r ON  e.role_id = r.id
JOIN department d ON r.department_id = d.id`;

//select by department
const selectDepartmentEmployees = (department) => `SELECT * 
FROM employee e, department d, role r
WHERE e.role_id = r.id 
and  r.department_id = d.id
and d.name = '${department}'`;

// select by manager
const selectManagerEmployees = (managerId) => `SELECT * 
FROM employee_db.employee e, employee_db.role r
WHERE e.role_id = r.id 
and e.manager_id = '${managerId}'`;
//select department budget
const selectDepartmentBudget = (department) => `SELECT sum(salary)
FROM employee e, department d, role r
WHERE e.role_id = r.id 
and  r.department_id = d.id
and d.name = '${department}'`;

//add department
const addAdepartment = (id, aName) =>
  `INSERT INTO department (id, name) VALUES ('${id}', '${aName}')`;

// get max id
const maxId = (department) => `SELECT max(id) as max FROM ${department}`;

//add role
const addArole = (id, aTitle, aSalary, department_id) =>
  `INSERT INTO role (id, title, salary, department_id) VALUES ('${id}', '${aTitle}','${aSalary}','${department_id}')`;

//get specific department if
const specificDepartment = (department) => `SELECT id FROM department WHERE name = '${department}'`;

//get all employees by role
const employeeByRole = (role) => `SELECT e.id, first_name 
  FROM employee e, role r
  WHERE e.role_id = r.id 
  and r.title = '${role}';`;

//add an employee
const addAnEmployee = (id, fName, lName, rId, mId) =>
  `INSERT INTO employee (id, first_name, last_name, role_id, manager_id) VALUES ('${id}', '${fName}','${lName}','${rId}','${mId}')`;

//update an employee role
const updateEmployeeDetails = (aColumn, aValue, id) =>
  `UPDATE employee SET ${aColumn} = '${aValue}' WHERE id = '${id}'`;

const deleteAnOption = (table, aValue, id) => `DELETE FROM ${table} WHERE ${aValue} = '${id}'`;

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
