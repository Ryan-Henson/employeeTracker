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
        "EXIT",
      ],
    })
    .then((answer) => {
      switch (answer.choice) {
        case "View all employees":
          cALL("employee");
          break;

        case "View all departments":
          cALL("department");
          break;

        case "View all roles":
          cALL("role");
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
          eRoleUpp();
          break;

        case "EXIT":
          process.exit();
          break;

        default:
          process.exit();
      }
    });
}

function cALL(thing) {
  connection.query("SELECT * FROM ??", thing, function (err, res) {
    if (err) throw err;
    console.table(res);
    promptUser();
  });
}

function eADD() {
  connection.query("SELECT * FROM role", function (err, res) {
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
        {
          name: "inputRole",
          type: "list",
          message: "What is the employees role?",
          choices: res.map((item) => ({ name: item.title, value: item })),
        },
        {
          name: "inputManagerID",
          type: "input",
          message:
            "What is the manager ID (must be a number) for this employee?",
        },
      ])
      .then(function (answer) {
        connection.query("INSERT INTO employee SET ?", {
          first_name: answer.inputName1,
          last_name: answer.inputName2,
          role_id: answer.inputRole.id,
          manager_id: answer.inputManagerID,
        });
        promptUser();
        //manEADD();
      });
  });
}
///////////////////////////////was not able to get to work, it kept adding after the initl add.////////////////////////////////////////////
// function manEADD() {
//   connection.query("SELECT * FROM employee", function (err, res) {
//     if (err) throw err;
//     inquirer
//       .prompt({
//         name: "inputManagerID",
//         type: "list",
//         message: "Who will be the employees manager?",
//         choices: res.map((item) => ({
//           name: `${item.first_name} ${item.last_name}`,
//           value: item,
//         })),
//       })
//       .then(function (answer) {
//         console.log(answer.inputManagerID.id);
//         connection.query("INSERT INTO employee SET ?", {
//           manager_id: answer.inputManagerID.id,
//         });
//       });
//   });
//   ///////////////////////////////////////
//   //then will run a back or exit prompt//
//   ///////////////////////////////////////
//   // promptUser();
// }
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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
      promptUser();
    });
}

function rADD() {
  connection.query("SELECT * FROM department", function (err, res) {
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
        {
          name: "dID",
          type: "list",
          message: "What department is this role in?",
          choices: res.map((item) => ({ name: item.name, value: item })),
        },
      ])
      .then(function (answer) {
        connection.query("INSERT INTO role SET ?", {
          title: answer.roleTitle,
          salary: answer.roleSalary,
          department_id: answer.dID.id,
        });
        promptUser();
      });
  });
}

//////////////////////////////////////////////this is dum/////////////////////////////////////////////////
// function eRoleUpp() {
//   connection.query("SELECT * FROM employee", function (err, res) {
//     if (err) throw err;
//     inquirer
//       .prompt({
//         name: "selEmp",
//         type: "list",
//         message: "What employee would you like to modify the role for?",
//         choice: res.map((item) => ({
//           name: `${item.first_name} ${item.last_name}`,
//           value: item,
//         })),
//       })
//       .then(function (answer) {
//         connection.query(
//           "Select * FROM employee Where ?",
//           { id: answer.selEmp },
//           function (err, res) {
//             inquirer
//               .prompt({
//                 name: "nInputRole",
//                 type: "list",
//                 message: "What is the employees role?",
//                 choices: res.map((item) => ({ name: item.title, value: item })),
//               })
//               .then(function (answer) {
//                 connection.query("UPDATE employee SET ? WHERE ?", [
//                   {
//                     role_id: answer.inputRole.id,
//                   },
//                   {
//                     employee: answer.selEmp,
//                   },
//                 ]);
//                 promptUser();
//               });
//           }
//         );
//       });
//   });
// }
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
function eRoleUpp() {
  connection.query("SELECT * FROM employee", function (err, res) {
    if (err) throw err;
    inquirer
      .prompt([
        {
          name: "selEmp",
          type: "list",
          message: "What employee would you like to modify the role for?",
          choices: res.map((item) => ({
            name: `${item.first_name} ${item.last_name}`,
            value: item,
          })),
        },
        {
          name: "nInputRole",
          type: "input",
          message: "What is the employees new role ID?",
        },
      ])
      .then(function (answer) {
        connection.query("UPDATE employee SET ? WHERE ?", [
          {
            role_id: answer.nInputRole,
          },
          {
            id: answer.selEmp.id,
          },
        ]);
        promptUser();
      });
  });
}
