var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "123456789",
  database: "employee_trackerdb"
});

connection.connect(function(err) {
  if (err) throw err;
  start();
});

function start() {
  inquirer
    .prompt({
      name: "action",
      type: "rawlist",
      message: "What would you like to do?",
      choices: [
        "Add a department/role/employee?",
        "View existing departments/roles/employees?",
        "Update employee roles?",
      ]
    })
    .then(function(answer) {
      switch (answer.action) {
      case "Add a department/role/employee?":
        addDepRoleEmp();
        break;

      case "View existing departments/roles/employees?":
        viewDepRoleEmp();
        break;

      case "Update employee roles?":
        updateEmpRole();
        break;
      }
    });
};

// working
function addDepRoleEmp() {
  inquirer
    .prompt({
      name: "add_action",
      type: "rawlist",
      message: "What would you like to add?",
      choices: [
        "Add departments?",
        "Add roles?",
        "Add employees?",
      ]
    })
    .then(function(answer) {
      switch (answer.action) {
      case "Add departments?":
        addDep();
        break;

      case "Add roles?":
        addRole();
        break;

      case "Add employees?":
        addEmp();
        break;
      }
    });
};

// not working
function addDep() {

};

// not working
function addRole() {

};

// not working
function addEmp() {
  inquirer
    .prompt({
      name: "addFirstName",
      type: "input",
      message: "What is the first name of the new employee?"
    })
    .then(function(answer) {
      console.log(answer);
      connection.query("INSERT INTO `employee` first_name VALUES ?;", { addFirstName: answer }, function(err, res) {
        console.log(
          "ID: " +
            res.id +
            " || First Name: " +
            res.first_name 
        );
        runSearch();
      });
    });
};

// working
function viewDepRoleEmp() {
  inquirer
    .prompt({
      name: "view_action",
      type: "rawlist",
      message: "What would you like to view?",
      choices: [
        "View departments?",
        "View roles?",
        "View employees?",
      ]
    })
    .then(function(answer) {
      switch (answer.action) {
      case "View departments?":
        viewDep();
        break;

      case "View roles?":
        viewRole();
        break;

      case "View employees?":
        viewEmp();
        break;
      }
    });
};

// not working
function viewDep() {
  connection.query("SELECT * FROM department", function(err, res) {
    if (err) throw err;
    console.log(
      "ID: " +
        res.id +
        " || Department: " +
        res.name 
    );
    start();
    });
};

// not working
function viewRole() {
  inquirer
  .prompt({
    name: "role",
    type: "input",
    message: "What role would you like to view?"
  })
  .then(function(answer) {
    console.log(answer.title);
    connection.query("SELECT * FROM role WHERE ?", { role: answer.title }, function(err, res) {
      console.log(
        "ID: " +
        res.id +
        " || Title: " +
        res.title +
        " || Salary: " +
        res.salary +
        " || Department ID: " +
        res.department_id
      );
      start();
    });
  });
};

// not working
function viewEmp() {
  inquirer
  .prompt({
    name: "employee",
    type: "input",
    message: "Which employee would you like to view?"
  })
  .then(function(answer) {
    console.log(answer.first_name, answer.last_name);
    connection.query("SELECT * FROM role WHERE ? AND ?", { employee: answer.first_name, employee: answer.last_name }, function(err, res) {
      console.log(
        "ID: " +
        res.id +
        " || First Name: " +
        res.first_name +
        " || Last Name: " +
        res.last_name +
        " || Role ID: " +
        res.role_id +
        " || Manager ID " +
        res.manager_id
      );
      start();
    });
  });
};

// not working
function updateEmpRole() {

};

