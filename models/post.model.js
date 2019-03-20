const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

let PostSchema = new Schema({
    title: String,
    body: String,
    files: Array,
    tags: Array,
    video: String,
    author: { type: Schema.Types.ObjectId, ref: 'Author' },
    date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Post', PostSchema);
