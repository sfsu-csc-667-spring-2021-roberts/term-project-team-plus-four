var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const passport = require("passport");
const flash = require("express-flash");
const session = require("express-session");

//  loads the environment variables defined in .env
if (process.env.NODE_ENV.trim() === "development") {
  require("dotenv").config();
}

const indexRouter = require("./routes/index");
const gameRouter = require("./routes/game");
const testRouter = require("./routes/tests");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// express-flash & express-session
app.use(flash());
app.use(
  session({
    secret: process.env.SESSION_SECRET, //make a secret id for the user to stay logged in
    resave: false, //if nothing is changed within the session will not save
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use("/", indexRouter);
app.use("/tests", testRouter);
app.use("/game", gameRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
