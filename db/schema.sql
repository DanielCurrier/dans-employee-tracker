-- drops the business_db if it already exists--
DROP DATABASE IF EXISTS business_db;
-- Calls the creation of business_db--
CREATE DATABASE business_db;
-- uses the new db!--
USE business_db;
-- Creates the Department table and its roles--
CREATE TABLE Department (
    id INT AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL UNIQUE,
    PRIMARY KEY(id)
);
-- Creates the Role table and its child elements--
CREATE TABLE Role (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(10, 2) NOT NULL,
    department_id INT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY (department_id) REFERENCES Department(id)
);
-- Creates the Employee table and its child elements--
Create TABLE Employee (
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL UNIQUE,
    last_name VARCHAR(30) NOT NULL UNIQUE,
    role_id INT NULL,
    manager_id INT,
    PRIMARY KEY(id),
    FOREIGN KEY (role_id) REFERENCES Role(id)
);