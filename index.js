const express = require('express');
const app     = express();
require('dotenv').config();

// Middleware ( move )
const session = require('express-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
// BodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// Express Session
app.use(session({
  secret: 'secret',
  saveUninitialized: true,
  resave: true
}));

// Passport init
app.use(passport.initialize());
app.use(passport.session());

const post = require('./routes/post.route'); // Imports routes for the posts router
const user = require('./routes/user.route'); // Imports routes for the users router

const mongoose = require('mongoose');
const uri = process.env.MONGOLAB_URI || 'mongodb://localhost/yab_db';
mongoose.Promise = global.Promise;
mongoose.connect(uri); 

app.use('/posts', post);
app.use('/users', user);
app.get('/', ( req, res ) => {
    res.send('Hello World');
});

app.listen( 3000, () => { console.log('Gooooooooooomba') });
