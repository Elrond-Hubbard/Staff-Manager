INSERT INTO departments (name)
VALUES ("Engineering"),
       ("Finance"),
       ("Legal"),
       ("Sales");

INSERT INTO roles (title, salary, department_id)
VALUES ("Sales Lead", 100000, 4),
       ("Salesperson", 80000, 4),
       ("Lead Engineer", 150000, 1),
       ("Software Engineer", 120000, 1),
       ("Account Manager", 160000, 2),
       ("Accountant", 125000, 2),
       ("Legal Team Lead", 250000, 3),
       ("Lawyer", 190000, 3);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Chris", "Cotelesse", 1, NULL),
       ("Ricky", "Cotelesse", 2, 1),
       ("Jay", "Li", 3, NULL),
       ("Billy", "Harland", 4, 3),
       ("Mariah", "Cruz", 5, NULL),
       ("Sarah", "Shover", 6, 5),
       ("Megan", "Cogswell", 7, NULL),
       ("Michelle", "Conn", 8, 7);