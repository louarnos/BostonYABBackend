'use strict';

const app      = require('./auth.js').app;
const passport = require('./auth.js').passport;

const post = require('../routes/post.route');
const user = require('../routes/user.route');
const author = require('../routes/author.route');

app.use('/posts', post); // Auth happens on a per endpoint basis
app.use('/authors', passport.authenticate('jwt', { session : false }), author ); // Entire controller requires auth
app.use('/users', user);

module.exports = {
    app,
}
