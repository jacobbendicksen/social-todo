var usersfile = "./data/users.db";
var tasksfile = "./data/tasks.db";
var sqlite3 = require('sqlite3').verbose();
var usersDB = new sqlite3.Database(usersfile);
var tasksDB = new sqlite3.Database(tasksfile);
var fs = require("fs");

var usersExist = fs.existsSync(usersfile);
var tasksExist = fs.existsSync(tasksfile);

usersDB.serialize(function() {
  if(!usersExist) {
    console.log("new users db");
    usersDB.run("CREATE TABLE users (email TEXT, password TEXT, firstname TEXT, lastname TEXT, userid INT)");
  }
});

tasksDB.serialize(function() {
  if(!tasksExist) {
    console.log("new tasks db");
    tasksDB.run("CREATE TABLE tasks (id INT, text TEXT, usercreatedid TEXT, done BOOL)");
  }
});

function signupUser(first, last, email, pw, id){
    usersDB.run("INSERT INTO users (email, password, firstname, lastname, userid) VALUES (?,?,?,?,?)", [user, pw, firstname, lastname, userid]);
    usersDB.get("SELECT userid, firstname, lastname, email, password FROM users WHERE userid=?", userid, function(error, row){
        console.log(row);
        console.log(error);
    })
}

function checkIfUserExists(email, pw){
    usersDB.get("SELECT firstname FROM users WHERE email=?", user, function(error, row) {
        if (row !== undefined) {
            return true;
        }
        else {
            return false;
        }
    });
}

module.exports = {
    signupUser: signupUser,
    checkIfUserExists: checkIfUserExists
}
