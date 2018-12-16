'use strict';

const app     = require('./parsing').app;

const session = require('express-session');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

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
const User = require('../models/user.model');
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

app.post('/login', passport.authenticate('local'), ( req, res ) => {
    const body = { id: req.user._id, username: req.user.username, name: req.user.username };
    const token = jwt.sign({ user : body }, 'top_secret', { expiresIn: '2h' } );
    res.json({token});
});

app.post('/logout', ( req, res ) => {
  req.logout();
  res.send({ success: true })
});

module.exports = {
    app,
    passport,
}
