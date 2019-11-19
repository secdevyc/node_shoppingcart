var passport = require("passport");
var User = require("../models/user.js");
var LocalStrategy = require("passport-local").Strategy;
passport.serializeUser(function(user, done) {
  done(null, user.id);
});
passport.deserializeUser(function(id, done) {
  User.findById(id, function(error, user) {
    done(error, user)
  });
});
passport.use("local.signup", new LocalStrategy ({
  usernameField: "email",
  passwordField: "password",
  passReqToCallback: true
}, function(req, email, password, done) {
  User.findOne({"email": email}, function(error, user) {
    if (error) {
      return done(error);
    }
    if (user) {
      return done(null, false, {message: "Email is already in use."});
    }
    var newUser = new User();
      newUser.email = email;
      newUser.password = newUser.encryptPassword(password);
      newUser.save(function(error, result) {
        if (error) {
          return done(error);
        }
        return done(null, newUser);
      });
    });
}));
passport.use("local.signin", new LocalStrategy ({
  usernameField: "email",
  passwordField: "password",
  passReqToCallback: true
  }, function (req, email, password, done) {
    User.findOne({"email": email}, function(error, user) {
      if (error) {
        return done(error);
      }
      if (!user) {
        return done(null, false, {message: "No user found."});
      }
      if (!user.validPassword(password)) {
        return done(null, false, {message: "Wrong password."});
      };
      return done(null, user);
  });
}));
