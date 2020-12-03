const mysql = require("mysql");
const inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "rootroot",
  database: "employeeDB",
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  promptUser();
  /////////////////////////////////////////////
  //will run a view, add, edit, delete propmt//
  /////////////////////////////////////////////
});

function promptUser() {
  inquirer
    .prompt({
      name: "choice",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "View all employees",
        "View all departments",
        "View all roles",
        "Add new employee",
        "Add new department",
        "Add new role",
        "Update employee roles",
      ],
    })
    .then((answer) => {
      switch (answer.choice) {
        case "View all employees":
          cALLE();
          break;

        case "View all departments":
          cALLD();
          break;

        case "View all roles":
          cALLR();
          break;

        case "Add new employee":
          eADD();
          break;

        case "Add new department":
          dADD();
          break;

        case "Add new role":
          rADD();
          break;

        case "Update employee roles":
          eUpp();
          break;

        default:
          process.exit();
      }
    });
}
////////////////////////////////////////////////////////////////////////////////////////////
// want to put all in one function but google says you cant pass a "table" as a ver so w/e//
function cALLE() {
  connection.query("SELECT * FROM employee", function (err, res) {
    if (err) throw err;
    console.table(res);
    ///////////////////////////////////////
    //then will run a back or exit prompt//
    ///////////////////////////////////////
    process.exit();
  });
}
function cALLD() {
  connection.query("SELECT * FROM department", function (err, res) {
    if (err) throw err;
    console.table(res);
    ///////////////////////////////////////
    //then will run a back or exit prompt//
    ///////////////////////////////////////
    process.exit();
  });
}
function cALLR() {
  connection.query("SELECT * FROM role", function (err, res) {
    if (err) throw err;
    console.table(res);
    ///////////////////////////////////////
    //then will run a back or exit prompt//
    ///////////////////////////////////////
    process.exit();
  });
}
////////////////////////////////////////////////////////////////////////////////////////

function eADD() {
  connection.query("SELECT title FROM role", function (err, res) {
    if (err) throw err;
    inquirer
      .prompt([
        {
          name: "inputName1",
          type: "input",
          message: "What is the employees first name?",
        },
        {
          name: "inputName2",
          type: "input",
          message: "What is the employees last name?",
        },
        ///////////////////////////////////////////////////////////////////////////////////
        ///////////////////////////////why u no work?////////////////////////////////////
        {
          name: "inputRole",
          type: "list",
          message: "What is the employees role?",
          choices: [1, 2, 3],
          // choices: res.map((item) => ({ role: item.title })),
        },
        {
          name: "inputManagerID",
          type: "list",
          message: "Who will be the employees manager?",
          choices: [1, 2, 3],
          // choices: res.map((item) => ({ employees: item.first_name item.last_name })),
        },
        //////////////////////////////////////////////////////////////////////////////////
      ])
      .then(function (answer) {
        connection.query("INSERT INTO employee SET ?", {
          first_name: answer.inputName1,
          last_name: answer.inputName2,
          role_id: answer.inputRole,
          manager_id: answer.inputManagerID,
        });
        ///////////////////////////////////////
        //then will run a back or exit prompt//
        ///////////////////////////////////////
        process.exit();
      });
  });
}

function dADD() {
  inquirer
    .prompt([
      {
        name: "inputDName",
        type: "input",
        message: "What is the departments name?",
      },
    ])
    .then(function (answer) {
      connection.query("INSERT INTO department SET ?", {
        name: answer.inputDName,
      });
      ///////////////////////////////////////
      //then will run a back or exit prompt//
      ///////////////////////////////////////
      process.exit();
    });
}

function rADD() {
  connection.query("SELECT name FROM department", function (err, res) {
    if (err) throw err;
    inquirer
      .prompt([
        {
          name: "roleTitle",
          type: "input",
          message: "What is the title of the role?",
        },
        {
          name: "roleSalary",
          type: "input",
          message: "What is the salary of this role?",
        },
        ///////////////////////////////////////////////////////////////////////////////////
        ///////////////////////////////why you no work?////////////////////////////////////
        {
          name: "dID",
          type: "list",
          message: "What department is this role in?",
          choices: [1, 2, 3],
          // choices: res.map((item) => ({ role: item.name })),
        },
      ])
      .then(function (answer) {
        connection.query("INSERT INTO employee SET ?", {
          title: answer.roleTitle,
          salary: answer.roleSalary,
          department_id: answer.dID,
        });
        ///////////////////////////////////////
        //then will run a back or exit prompt//
        ///////////////////////////////////////
        process.exit();
      });
  });
}

//////////////////////////////////////////////this is dum/////////////////////////////////////////////////
function eUpp() {
  connection.query("SELECT * FROM employee", function (err, res) {
    if (err) throw err;
    inquirer
      .propmt({
        name: "selEmp",
        type: "",
        message: "",
        choice: ["", "", ""],
      })
      .then(function (answer) {
        connection.query(
          "Select * FROM employee Where ?",
          { id: answer.selEmp },
          function (err, res) {
            inquirer.prompt([
              {
                name: "nInputName1",
                type: "input",
                message: "What is the employees first name?",
              },
              {
                name: "nInputName2",
                type: "input",
                message: "What is the employees last name?",
              },
              {
                name: "nInputRole",
                type: "list",
                message: "What is the employees role?",
                choices: [1, 2, 3],
              },
              {
                name: "nInputManagerID",
                type: "list",
                message: "Who will be the employees manager?",
                choices: [1, 2, 3],
              },
            ]);
          }
        );
      });
  });
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
