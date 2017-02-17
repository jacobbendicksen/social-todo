"use strict";

var express = require('express');
var app = express();
var router = express.Router();

var exphbs = require('express-handlebars');
app.engine('.hbs', exphbs({extname: '.hbs'}));
app.set('view engine', '.hbs');

var userControllers = require('./controllers/userControllers.js');

app.get('/', function(req, res) {
    res.render('../views/homeView.hbs');
    console.log("loaded index");
});

app.get('/login-page', function(req, res) {
    res.render('../views/loginView.hbs');
    console.log("loaded login\n");
});

// app.get('/login', function(req, res){
//     var user = req.query.email;
//     var pw = req.query.password;
//     usersDB.get("SELECT email, password FROM users WHERE email=?", user, function(error, row){
//       if (error == null){
//         console.log(row);
//         // console.log(row.email);
//         if (row.email == user && row.password == sha1(pw)){
//           res.render('../views/tasksView.hbs');
//         }
//         else {
//           //error
//           console.log("passwords didn't match\n");
//           res.render('../views/loginView.hbs');
//         }
//       }
//       else {
//         console.log(error);
//       }
//     })
// })

app.get('/signup-page', function(req, res) {
    res.render('../views/signupView.hbs');
    console.log("loaded signup");
});

app.get('/signup', function(req, res){
  userControllers.addUser(req.res);
});

app.listen(process.env.PORT || 4000);
