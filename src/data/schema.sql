DROP DATABASE IF EXISTS employee_db;

CREATE DATABASE employee_db;

use employee_db;

CREATE TABLE department (
     id INT NOT NULL,
     name VARCHAR(30) NOT NULL,
     primary key (id)
);
CREATE TABLE role (
     id INT NOT NULL,
     title VARCHAR(30) NOT NULL,
     salary DECIMAL NOT NULL,
     department_id INT NOT NULL,
     foreign key (department_id) references department (id),
     primary key (id)
);
CREATE TABLE employee (
     id INT NOT NULL,
     first_name VARCHAR(30) NOT NULL,
     last_name VARCHAR(30) NOT NULL,
     role_id INT NOT NULL,
     manager_id INT,
     foreign key (role_id) references role (id),
     foreign key (manager_id) references employee (id),
     primary key (id)
);

