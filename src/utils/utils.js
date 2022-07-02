//select all from a table
const selectAll = (aTable) => `SELECT * FROM ${aTable}`;
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

//get specifict department if
const specificDepartment = (aDepartment) =>
  `SELECT id FROM department WHERE name = '${aDepartment}'`;

module.exports = {
  selectAll,
  selectDepartmentEmployees,
  selectManagerEmployees,
  selectDepartmentBudget,
  addAdepartment,
  maxId,
  addArole,
  specificDepartment,
};
