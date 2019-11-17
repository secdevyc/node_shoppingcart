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
var app = express();
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
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
var indexRouter = require("./routes/index");
app.use("/", indexRouter);
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
