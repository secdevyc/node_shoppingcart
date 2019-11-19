// =====================
// Dependencies
// =====================
var cookieParser = require("cookie-parser");
var createError = require("http-errors");
var express = require("express");
var expressHbs = require("express-handlebars");
var logger = require("morgan");
var mongoose = require("mongoose");
var path = require("path");
var session = require('express-session');
var passport = require('passport');
var flash = require('connect-flash');
var validator = require('express-validator');

var app = express();

var routes = require('./routes/index.js');
var userRoutes = require('./routes/user.js');
// view engine setup
app.engine(".hbs", expressHbs({defaultLayout: "layout", extname: ".hbs"}));
app.set("view engine", ".hbs");
// =========================
// Configurations
// =========================
const mongoDB_URI = "mongodb://localhost:27017/shopping";
mongoose.connect(mongoDB_URI, {useNewUrlParser: true});
mongoose.connection.once("open", () => {
  console.log("Connected to Mongoose.");
});
require('./config/passport');


// ==========================
// Fix Deprecation Warnings
// ==========================
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
// ==========================
// Middleware
// ==========================
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(validator());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(session({secret: 'mysupersecret', resave: false, saveUnitialized: false}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  res.locals.login = req.isAuthenticated();
  next();
})

app.use('/user', userRoutes)
app.use("/", routes);

// ==========================
// Error Handlers
// ==========================
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render("error");
});
// ==========================
// Exports
// ==========================
module.exports = app;
