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
  inquirer.prompt({
    type: "list",
    message: "What would you like to do?",
    name: "choice",
    choices: [
      "View all employees",
      "View all departments",
      "View all roles",
      "Add new employee",
      "Add new department",
      "Add new role",
      "Update employee roles",
    ],
  }).then;
  switch (choice) {
    case "View all employees":
      cALL("employees");
      break;
    case "View all departments":
      cALL("employees");
      break;
    case "View all roles":
      cALL("employees");
      break;
    case "Add new employee":
      break;
    case "Add new department":
      break;
    case "Add new role":
      break;

    default:
      process.exit();
  }
}

function cALL(thingy) {
  connection.query("SELECT * FROM ?", { thingy }, function (err, res) {
    if (err) throw err;
    console.table();
  });
}
