-- drops the business_db if it already exists--
DROP DATABASE IF EXISTS business_db;
-- Calls the creation of business_db--
CREATE DATABASE business_db;
-- uses the new db!--
USE business_db;
-- Creates the Department table and its roles--
CREATE TABLE Department (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL UNIQUE,
);
-- Creates the Role table and its child elements--
CREATE TABLE Role(
    id INT PRIMARY KEY AUTO_INCREMENT,
    Title VARCHAR(30) NOT NULL,
    Salary DECIMAL(10, 2) NOT NULL,
    department_id INT,
    FOREIGN KEY (department_id) REFERENCES Department(id)
);
-- Creates the Employee table and its child elements--
Create TABLE Employee(
    id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL UNIQUE,
    last_name VARCHAR(30) NOT NULL UNIQUE,
    role_id INT,
    manager_id INT,
    FOREIGN KEY (role_id) REFERNCES Role(id)
);