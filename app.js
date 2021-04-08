var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var passport = require('passport');       // Authentication middleware, once we define a strategy we can use it anywhere on the app. 
var flash = require('connect-flash');     // Session-based middleware displaying notifications to the users
//var request = require('request');         // HTTP calls within the app
var session = require("express-session"); // Helps manage session-related stuff, including cookies. 


//  loads the environment variables defined in .env
if (process.env.NODE_ENV.trim() === "development") {
  require("dotenv").config();
}

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var testsRouter = require("./routes/tests");
var loginRouter = require("./routes/login");
var signUpRouter = require("./routes/signup");
var lobbiesRouter = require("./routes/lobbies");
var gamesRouter = require("./routes/games");

var app = express();

//-------- PASSPORT AUTHENTICATION --------
require('./config/passport');
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// app.use((req,res,next) => {
//   console.log(req.session);
//   console.log(req.user);
//   next();
// })

//--------- VIEW ENGINE SETUP ----------
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/tests", testsRouter);
app.use("/games", gamesRouter);
app.use("/lobbies", lobbiesRouter);
app.use("/login", loginRouter);
app.use("/signup", signUpRouter);


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
