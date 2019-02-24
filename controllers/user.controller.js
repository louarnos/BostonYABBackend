const User = require('../models/user.model');

exports.register = (req, res ) => {
    let token                = req.body.authToken;
    let password             = req.body.password;
    let passwordConfirmation = req.body.passwordConfirmation;

	// TODO THAT USERNAME/EMAIL NOT ALREADY TAKEN
	//
    if ( token === process.env.REGISTRATION_PW && password === passwordConfirmation ) {

		let newUser = new User({
		  name: req.body.name,
		  email: req.body.email,
		  username: req.body.username,
		  password: req.body.password
		});

		User.createUser(newUser, function(err, user){
		  if( err ) throw err;
		  res.json(user)
		});

    } else if ( token === process.env.REGISTRATION_PW && password !== passwordConfirmation ) {
		res.status(400).json({error: "Passwords don't match"});
    } else if ( token !== process.env.REGISTRATION_PW ) {
		res.status(403).json({ error: 'Access Denied'});
    }
};

exports.login = ( req, res ) => {
    let password = req.body.password;
	let username = req.body.username;
};

exports.byUsername = (req, res) => {
	let username = req.body.username;
	let user     = User.getUserByUsername(username);
	res.send(user);
};

exports.all = (req, res) => {
	User.find({}, (err, users) => {
		let userMap = {};

		users.forEach( (user) => {
		  userMap[user._id] = user;
		});
		res.send(userMap);  
   });
};
