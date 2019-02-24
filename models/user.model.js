const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// User Schema
const UserSchema = mongoose.Schema({
  username: {
    type: String,
    index:true
  },
  password: {
    type: String
  },
  email: {
    type: String
  },
  name: {
    type: String
  }
});

const User = mongoose.model('User', UserSchema);

const createUser = (newUser, callback) => {
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      newUser.password = hash;
      newUser.save(callback);
    });
  });
}

const getUserByUsername = ( username, callback ) => {
	return User.findOne({ username: username }, callback);
}

const getUserById = ( id, callback ) => {
	return User.findOne({ _id: id }, callback);
}

const comparePassword = (candidatePassword, hash, callback) => {
  bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
    if(err) throw err;
    callback(null, isMatch);
  });
}

User.createUser = createUser;
User.getUserByUsername = getUserByUsername;
User.getUserById = getUserById;
User.comparePassword = comparePassword;

module.exports = {
	User
}

module.exports = User;
