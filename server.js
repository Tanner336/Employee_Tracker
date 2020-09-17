const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require("console.table");

const connection = mysql.createConnection({
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
        "Update employee?",
        "DELETE?!?"
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

      case "Update employee?":
        updateEmp();
        break;

      case "DELETE?!?":
        deleteInfo();
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
      switch (answer.add_action) {
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

// working
function addDep() {
  inquirer
    .prompt(
      [{
      name: "addDepName",
      type: "input",
      message: "What is the Name of this new deparment?"
    }]
    )
    .then(function(answer) {

      connection.query(
      "INSERT INTO department SET ?",
      {
        name: answer.addDepName,
      },

      function(err) {
        if (err) throw err;
        console.log("New Role added successfully!");
        const table = cTable.getTable([{
          name: answer.addDepName,
        }])
        console.log(table)
        start();
      })
  })
};

// working
function addRole() {
  inquirer
    .prompt(
      [{
      name: "addTitle",
      type: "input",
      message: "What is the title of this new role?"
    },
    {
      name: "addSalary",
      type: "input",
      message: "What is the salary of this new role?"
    },
    {
      name: "addDepartmentId",
      type: "input",
      message: "What is the Department ID for this new role?"
    }]
    )
    .then(function(answer) {

      connection.query(
      "INSERT INTO role SET ?",
      {
        title: answer.addTitle,
        salary: answer.addSalary,
        department_id: answer.addDepartmentId || 0
      },

      function(err) {
        if (err) throw err;
        console.log("New Role added successfully!");
        const table = cTable.getTable([{
          title: answer.addTitle,
          salary: answer.addSalary,
          department_id: answer.addDepartmentId || 0
          }])
        console.log(table)
        start();
      })
  })
};

// working
function addEmp() {
  inquirer
    .prompt(
      [{
      name: "addFirstName",
      type: "input",
      message: "What is the first name of the new employee?"
    },
    {
      name: "addLastName",
      type: "input",
      message: "What is the last name of the new employee?"
    },
    {
      name: "addRoleId",
      type: "input",
      message: "What is the Role ID of the new employee?"
    },
    {
      name: "addManagerId",
      type: "input",
      message: "What is the Manager ID for the new employee?"
    }]
    )
    .then(function(answer) {

      connection.query(
      "INSERT INTO employee SET ?",
      {
        first_name: answer.addFirstName,
        last_name: answer.addLastName,
        role_id: answer.addRoleId || 0,
        manager_id: answer.addManagerId || 0
      },

      function(err) {
        if (err) throw err;
        console.log("New Employee added successfully!");
        const table = cTable.getTable([{
          first_name: answer.addFirstName,
          last_name: answer.addLastName,
          role_id: answer.addRoleId || 0,
          manager_id: answer.addManagerId || 0
        }])
        console.log(table)
        start();
      })
  })
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
        "View all employees?"
      ]
    })
    .then(function(answer) {
      switch (answer.view_action) {
      case "View departments?":
        viewDep();
        break;

      case "View departments?":
        viewAllDep();
        break;

      case "View roles?":
        viewRole();
        break;

      case "View employees?":
        viewEmp();
        break;

      case "View all employees?":
        viewAllEmp();
        break;
  
      }
    });
};

// working
function viewDep() {
  connection.query("SELECT * FROM department", function(err, res) {
    if (err) throw err;
    for(let i = 0; i<res.length; i++) {
      const table = cTable.getTable([{
        Department_Name: res[i].name,
      }])
      console.log(table)
    }
  start();
    });
};


// working
function viewRole() {
  inquirer
  .prompt({
    name: "view_role",
    type: "input",
    message: "What role would you like to view?"
  })
  .then(function(answer) {
    console.log(answer.view_role);
    connection.query('SELECT * FROM role WHERE ?', {title: answer.view_role}, function(err, res) {
      if (err) throw err;
      for(let i = 0; i<res.length; i++) {
        const table = cTable.getTable([{
          title: res[i].title,
          salary: res[i].salary,
          department_id: res[i].department_id || 0
        }])
        console.log(table)
      }
        start();
    });
  });
};

// working
function viewEmp() {
  inquirer
  .prompt([{
    name: "employee_id",
    type: "input",
    message: "What is the ID number of the employee?"
  },
  ])
  .then(function(answer) {
    connection.query("SELECT * FROM employee WHERE ?", {id: answer.employee_id}, function(err, res) {
      if (err) throw err;
      for(let i = 0; i<res.length; i++) {
      const table = cTable.getTable([{
        first_name: res[i].first_name,
        last_name: res[i].last_name,
        role_id: res[i].role_id || 0,
        manager_id: res[i].manager_id || 0
      }])
      console.log(table)
    }
      start();
    });
  });
};

// working
function viewAllEmp() {
  connection.query("SELECT * FROM employee;", function(err, res) {
    if (err) throw err;
    for(let i = 0; i<res.length; i++) {
      const table = cTable.getTable([{
        FirstName: res[i].first_name ,
        LastName: res[i].last_name,
        role_id: res[i].role_id || 0,
        manager_id: res[i].manager_id || 0
      }])
      console.log(table)
    }
    start();
  });
};
// working
function updateEmp() {
  inquirer
    .prompt({
      name: "action",
      type: "rawlist",
      message: "What would you like to do?",
      choices: [
        "Update employee name?",
        "Update employee role?",
        "Update employee manager ID?",
      ]
    })
    .then(function(answer) {
      switch (answer.action) {
      case "Update employee name?":
        updateEmpName();
        break;

      case "Update employee role?":
        updateEmpRole();
        break;

      case "Update employee manager ID?":
        updateEmpManagerId();
        break;
      }
    });

};

// working
function updateEmpName() {
  inquirer
    .prompt([{
      name: "findEmpId",
      type: "input",
      message: "What is the ID of the employee you are trying to change?"
    },
    {
      name: "updateFirstName",
      type: "input",
      message: "What is the new first name of the employee?"
    },
    {
      name: "updateLastName",
      type: "input",
      message: "What is the new last name of the employee?"
    },
  ]
  )
  .then(function(answer) {
    connection.query(
    `UPDATE employee SET first_name = "${answer.updateFirstName}", last_name = "${answer.updateLastName}" WHERE id = "${answer.findEmpId}"`,
    function(err) {
      if (err) throw err;
      console.log("Employee updated successfully!");
      start(); 
    })
})
};

// working 
function updateEmpManagerId() {
  inquirer
    .prompt([{
      name: "findEmpId",
      type: "input",
      message: "What is the ID of the employee you are trying to change?"
    },
    {
      name: "updateManagerId",
      type: "input",
      message: "What is the new Manager ID for the employee?"
    }
  ]
  )
  .then(function(answer) {
    connection.query(
    `UPDATE employee SET manager_id = "${answer.updateManagerId}" WHERE id = "${answer.findEmpId}"`,
    function(err) {
      if (err) throw err;
      console.log("Employee updated successfully!");
      start();
    })
})
};

// working
function updateEmpRole() {
  inquirer
    .prompt([{
      name: "findEmpId",
      type: "input",
      message: "What is the ID of the employee you are trying to change?"
    },
    {
      name: "updateRoleId",
      type: "input",
      message: "What is the new Role ID of the employee?"
    },
  ]
    )
    .then(function(answer) {

      connection.query(
      `UPDATE employee SET role_id = "${answer.updateRoleId}" WHERE id = "${answer.findEmpId}"`,
      function(err) {
        if (err) throw err;
        console.log("Employee updated successfully!");
        start();
      })
  })
};

//working
function deleteInfo() {
  inquirer
    .prompt({
      name: "delete_action",
      type: "rawlist",
      message: "What would you like to delete?",
      choices: [
        "Delete departments?",
        "Delete roles?",
        "Delete employees?"
      ]
    })
    .then(function(answer) {
      switch (answer.delete_action) {
      case "Delete departments?":
        deleteDep();
        break;

      case "Delete roles?":
        deleteRole();
        break;

      case "Delete employees?":
        deleteEmp();
        break;
      }
    });
};

// working
function deleteDep() {
  inquirer
    .prompt([{
      name: "findDepName",
      type: "input",
      message: "What is the Name of the Department you are trying to delete?"
    }
  ])
  .then(function(answer) {
    connection.query(
    `DELETE FROM department WHERE name = "${answer.findDepName}"`,
    function(err) {
      if (err) throw err;
      console.log("Department deleted successfully!");
      start();
    })
  })
};

// working
function deleteRole() {
  inquirer
    .prompt([{
      name: "findRoleTitle",
      type: "input",
      message: "What is the Title of the role you are trying to delete?"
    }
  ])
  .then(function(answer) {
    connection.query(
    `DELETE FROM role WHERE title = "${answer.findRoleTitle}"`,
    function(err) {
      if (err) throw err;
      console.log("Role deleted successfully!");
      start();
    })
  })
};

// working
function deleteEmp() {
  inquirer
    .prompt([{
      name: "findEmpId",
      type: "input",
      message: "What is the ID of the employee you are trying to delete?"
    }
  ])
  .then(function(answer) {
    connection.query(
    `DELETE FROM employee WHERE id = "${answer.findEmpId}"`,
    function(err) {
      if (err) throw err;
      console.log("Employee deleted successfully!");
      start();
    })
  })
  };