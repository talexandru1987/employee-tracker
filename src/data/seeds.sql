INSERT INTO department(
  id,
  name

 )VALUES  (
  11, 
  "IT" 
),
(
  12, 
  "Finance"
),
(
  13, 
  "Engineering" 
),
(
  14, 
  "HR" 
);


INSERT INTO role(
  id,
  title,
  salary,
  department_id
) VALUES (
  21, 
  "Developer", 
  "6000",
  11
),
(
  22, 
  "Manager", 
  "5000",
  12
),
(
  23, 
  "Engineer", 
  "4000",
  13
)
(
  24, 
  "Advisor", 
  "3000",
  14
);

INSERT INTO employee(
  id,
  first_name,
  last_name,
  role_id,
  manager_id
) VALUES (
  31, 
  "Raluca", 
  "Munteanu",
  22,
  NULL
),
(
  32, 
  "Alexandru", 
  "Tanase",
  21,
  31
)
(
  33, 
  "Bob", 
  "Smith",
  23,
  31
)
(
  34, 
  "Sam", 
  "Smith",
  24,
  NULL
);
