const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

let PostSchema = new Schema({
    title: String,
    body: String,
    // TODO Author table with images stored
    author: String,
    date: { type: Date, default: Date.now },
    // TODO Images table stored to s3
});


// Export the model
module.exports = mongoose.model('Post', PostSchema);
