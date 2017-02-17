var userModels = require('../models/userModels.js');
var sha1 = require('sha1');

var id = 1;

function addUser(req,res){
  var user = req.query.email;
  var pw = sha1(req.query.password);
  var confirmpw = sha1(req.query.confirmpassword);
  var firstname = req.query.firstname;
  var lastname = req.query.lastname;

  if (pw != confirmpw){
    res.render('../views/signupView.hbs', {error: "Passwords didn't match."})
  }

  else if (models.checkIfUserExists(user, pw)){
    res.render('../views/loginView.hbs');
  }

  else {
    models.signupUser(firstname, lastname, user, pw, id);
    id += 1;
    res.render('../views/loginView.hbs');
  }
}

module.exports = {
    addUser: addUser
}
