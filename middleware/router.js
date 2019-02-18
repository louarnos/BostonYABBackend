'use strict';

const app      = require('./auth.js').app;
const passport = require('./auth.js').passport;

const post = require('../routes/post.route'); // Imports routes for the posts router
const user = require('../routes/user.route'); // Imports routes for the users router

app.use('/posts', passport.authenticate('jwt', { session : false }), post);
app.use('/users', user);

module.exports = {
    app,
}