INSERT INTO Department(name)
VALUES ("Human Resources"),
    ("Public Relations"),
    ("Finance"),
    ("Legal"),
    ("Information Technology");
INSERT INTO Role(Title, Salary, department_id)
VALUES ("Paralegal", 50000, 4),
    ("IT Director", 180000, 5),
    ("Senior Accountant", 82000, 3),
    ("PR Representative", 54000, 2),
    ("HR Manager", 110000, 1),
    ("Chief Legal Counsel", 95000, 4),
    ("PR Manager", 85000, 2),
    ("Junior Software Developer", 70000, 5);
INSERT INTO Employee(first_name, last_name, role_id, manager_id)
VALUES("Emilio", "Cortez", 1, 3),
    ("Vanessa", "Higgins", 2, NULL),
    ("Jake", "Salle", 6, NULL),
    ("Dan", "Currier", 8, 2),
    ("Gina", "LaForge", 4, 9),
    ("Mike", "Blum", 3, NULL),
    ("Johnathan", "Johnson", 4, 9),
    ("Alyssa", "Blum", 1, 3),
    ("Kristian", "Anderson", 7, NULL),
    ("Christina", "Ngo", 8, 2);