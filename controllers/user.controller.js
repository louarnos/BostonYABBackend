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
		res.status(400).send("{error: \"Passwords don't match\"}").end()
    } else if ( token !== process.env.REGISTRATION_PW ) {
		res.status(403).send("{error: \"Access Denied\"}").end()
    }
};

exports.login = function ( req, res ) {
    let password = req.body.password;
	let username = req.body.username;
};

exports.byUsername = function (req, res) {
	let username = req.body.username;
	let user     = User.getUserByUsername(username);
	res.send(user);
};

exports.all = function (req, res) {
	User.find({}, function(err, users) {
		let userMap = {};

		users.forEach(function(user) {
		  userMap[user._id] = user;
		});
		res.send(userMap);  
   });
};
