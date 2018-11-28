const express = require('express');
const app     = express();
require('dotenv').config();

// Middleware ( move )
const session = require('express-session');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
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

// TODO this is a mess and needs to be redesigned
const User = require('./models/user.model');
const LocalStrategy = require('passport-local').Strategy;

passport.use( new LocalStrategy(
  (username, password, done) => {
    User.getUserByUsername(username, (err, user) => {
      if(err) throw err;
      if(!user){
        return done(null, false, {message: 'Unknown User'});
      }
      User.comparePassword(password, user.password, (err, isMatch) => {
        if(err) throw err;
     	if(isMatch){
     	  return done(null, user);
     	} else {
     	  return done(null, false, {message: 'Invalid password'});
     	}
     });
   });
  }
));

passport.use(new JWTstrategy({
  secretOrKey : 'top_secret',
  jwtFromRequest : ExtractJWT.fromAuthHeaderAsBearerToken()
}, async (token, done) => {
  try {
    return done(null, token.user);
  } catch (error) {
    done(error);
  }
}));

passport.serializeUser( (user, done) => {
  done(null, user.id);
});

passport.deserializeUser( (id, done) => {
  User.getUserById(id, (err, user) => {
    done(err, user);
  });
});

const post = require('./routes/post.route'); // Imports routes for the posts router
const user = require('./routes/user.route'); // Imports routes for the users router

const mongoose = require('mongoose');
const uri = process.env.MONGOLAB_URI || 'mongodb://localhost/yab_db';
mongoose.Promise = global.Promise;
mongoose.connect(uri); 

app.use('/posts', passport.authenticate('jwt', { session : false }), post);
app.use('/users', user);

app.get('/', ( req, res ) => {
    res.send('Hello World');
});

// Would like to move these somewhere else...
app.post('/login', passport.authenticate('local'), ( req, res ) => {
    const body = { id: req.user._id, username: req.user.username, name: req.user.username };
    const token = jwt.sign({ user : body }, 'top_secret', { expiresIn: '2h' } );
    res.json({token});
});

app.post('/logout', ( req, res ) => {
  req.logout();
  res.send({ success: true })
});

app.listen( 3000, () => { console.log('Gooooooooooomba') });
