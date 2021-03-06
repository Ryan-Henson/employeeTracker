DROP DATABASE IF EXISTS employeeDB;
CREATE DATABASE employeeDB;
USE employeeDB;
CREATE TABLE department (
    id INT AUTO_INCREMENT,
    name VARCHAR(30),
    PRIMARY KEY(id)
);
CREATE TABLE role (
    id INT AUTO_INCREMENT,
    title VARCHAR(30),
    salary DECIMAL(10,2),
    department_id INT,
    PRIMARY KEY (id)
);
CREATE TABLE employee (
    id INT AUTO_INCREMENT,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    manager_id INT,
    PRIMARY KEY(id)
);

INSERT INTO department (name)
VALUES ("Topdawg");

INSERT INTO role (title, salary, department_id)
VALUES ("Boss", 1000000, 1);

INSERT INTO role (title, salary, department_id)
VALUES ("role1", 500000, 2);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Ryan", "Henson", 1, null);
