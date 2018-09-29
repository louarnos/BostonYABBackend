const Post = require('../models/post.model');

//Simple version, without validation or sanitation
exports.test = function (req, res) {
    res.send('Greetings Evie Bruh!');
};
