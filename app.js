var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require("passport");
var session = require("express-session");
var mongoose = require("mongoose");
var multer = require("multer");
var im = require("imagemagick");
var gm = require("gm");
var methodOverride = require("method-override");
var device = require("express-device")
var reqFlash = require("req-flash");

//Mongoose Models
var Comment = require("./models/comment.js");
var User = require("./models/user.js");
var Video = require("./models/video.js");

//Database Url, select from server config or local database
var url = process.env.DATABASE || "mongodb://localhost:27017/youtube_app";
mongoose.connect(url);

var initPassport = require("./passport-init");

//Routes
var index = require('./routes/index');
var videos = require('./routes/video');
var users = require('./routes/user');
var accounts = require('./routes/account');
var comments = require("./routes/comment");
var auth = require('./routes/auth')(passport);
var search = require('./routes/search');

var app = express();

app.use(favicon(__dirname + '/public/images/favicon.ico'));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));
//decode json and urlencoded
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//Set up session
app.use(session({
  secret: "s93mSdsRwoj@9384js%$3p4ks"
}));
//make flash messages from pasport available anywhere
app.use(reqFlash());
//Passport
app.use(passport.initialize());
app.use(passport.session());
//Device recognition
app.use(device.capture());
device.enableViewRouting(app);
//Initialize passport
initPassport(passport);
//res.locals variables
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.errorMsg = req.flash().error;
    res.locals.successMsg = req.flash().success;
    next();
});

//Place before routes duh...:)
//Overrides the post method to handle put requests
app.use(methodOverride("_method"));

app.use('/', index);
app.use('/video', videos);
app.use('/user', users);
app.use('/account', accounts);
app.use('/comment', comments);
app.use('/auth', auth);
app.use('/search', search);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
