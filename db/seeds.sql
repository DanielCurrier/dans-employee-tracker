INSERT INTO Department(title)
VALUES ("Administration"),
    ("Human Resources"),
    ("Public Relations"),
    ("Finance"),
    ("Legal"),
    ("Information Technology");
INSERT INTO Role(Title, Salary, department_id)
VALUES ("CEO", 400000, 1),
    ("Paralegal", 50000, 5),
    ("IT Director", 180000, 6),
    ("Senior Accountant", 82000, 4),
    ("PR Representative", 54000, 3),
    ("HR Manager", 110000, 2),
    ("Chief Legal Counsel", 95000, 5),
    ("PR Manager", 85000, 3),
    ("Junior Software Developer", 70000, 6);
INSERT INTO Employee(first_name, last_name, role_id, manager_id)
VALUES("Emilio", "Cortez", 1, NULL),
    ("Vanessa", "Higgins", 4, 1),
    ("Jake", "Salle", 7, 1),
    ("Dan", "Currier", 9, 9),
    ("Gina", "LaForge", 5, 11),
    ("Mike", "Blum", 4, 1),
    ("Johnathan", "Johnson", 5, 11),
    ("Alyssa", "Blum", 2, 3),
    ("Kristian", "Anderson", 3, 1),
    ("Christina", "Ngo", 9, 9),
    ("Juan", "Juanathan", 8, 1);