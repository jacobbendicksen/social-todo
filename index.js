"use strict";

var express = require('express');
var app = express();
var router = express.Router();
var path = require('path');
var fs = require("fs");
var file = "foo.db";
var exists = fs.existsSync(file);
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database(file);

var userid = 1;

db.serialize(function() {
  if(!exists) {
    db.run("CREATE TABLE users (email TEXT, password TEXT, firstname TEXT, lastname TEXT, userid INT)");
  }
});

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + "/index.html"));
    console.log("loaded index\n");
});

app.get('/login-page', function(req, res) {
    res.sendFile(path.join(__dirname + "/login.html"));
    console.log("loaded login\n");
});

app.post('/login', function(req, res){
    var user = req.query.email;
    var pw = req.query.password;
    // var response =
    // if checkLogin(user, pw){
    //     res.sendFile(path.join(__dirname + '/todos.html'));
    // }
    // else {
    //     //error!
    // }
})

app.get('/signup-page', function(req, res) {
    res.sendFile(path.join(__dirname + "/signup.html"));
    console.log("loaded signup\n");
});

app.get('/signup', function(req, res){
  var user = req.query.email;
  var pw = req.query.password;
  var confirmpw = req.query.confirmpassword;
  var firstname = req.query.firstname;
  var lastname = req.query.lastname;

  var emailDB = db.get("SELECT firstname FROM users WHERE email=?", user, function(error, row) {
    if (row !== undefined) {
      console.log("user with that email already exists\n");
    }
    console.log(emailDB);
  })

  if (pw != confirmpw){
    console.log("passwords didn't match");
    //error
  }
  else {
    userid += 1;
    db.serialize(function(){
      var stmt = db.prepare("INSERT INTO users (email, password, firstname, lastname) VALUES (?,?,?,?)", [user, pw, firstname, lastname, userid]);
      stmt.finalize();
    })
  }
});

// function checkLogin(user, pw){
//     if (user.length() <= 50 && pw.length() <= 50){
//
//     }
// }

app.listen(process.env.PORT || 4000);
