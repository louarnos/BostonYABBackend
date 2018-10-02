const User = require('../models/user.model');

//Simple version, without validation or sanitation
exports.register = function (req, res) {
    let token                = req.body.authToken;
    let password             = req.body.password;
    let passwordConfirmation = req.body.passwordConfirmation;

    if ( token === process.env.REGISTRATION_PW && password === passwordConfirmation ) {

		let newUser = new User({
		  name: req.body.name,
		  email: req.body.email,
		  username: req.body.username,
		  password: req.body.password
		});

		User.createUser(newUser, function(err, user){
		  if(err) throw err;
		  res.send(user).end()
		});

    } else if ( token === process.env.REGISTRATION_PW && password !== passwordConfirmation ) {
        console.log('passwords dont match');
		res.status(400).send("{errors: \"Passwords don't match\"}").end()
    } else if ( token !== process.env.REGISTRATION_PW ) {
        console.log('Not authenticated');
		res.status(403).send("{errors: \"Access Denied\"}").end()
    }
};

exports.all = function (req, res) {
	User.find({}, function(err, users) {
		var userMap = {};

		users.forEach(function(user) {
		  userMap[user._id] = user;
		});

		res.send(userMap);  
   });
};
