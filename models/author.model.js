const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const AuthorSchema = new Schema({
  name: {
    type: String,
    index:true
  },
  pronouns: {
    type: Array
  },
  profilePicture: {
    type: String,
  }
});

const Author = mongoose.model('Author', AuthorSchema)

module.exports = Author
