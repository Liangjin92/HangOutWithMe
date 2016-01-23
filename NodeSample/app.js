/**
 * Author: Kaushik Yasaswy
 * Date: Saturday, 26-Sep-15 07:56:18 UTC
 */

var express = require('express');
var expressSession = require('express-session');

//var passport = require('passport');
//var passportLocal = require('passport-local');

var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var routes = require('./routes/index');
var sample = require('./routes/sampleRoute');
var homework = require('./routes/homeworkRoute');

var app = express();

console.log('CIS450/550 Homework3');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
//app.use(expressSession( { secret: process.env.SESSION_SECRET || 'secret',
//	resave: false,
//	saveUninitialized: false
//}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'img')));
app.use(express.static(path.join(__dirname, 'js')));
app.use('/', routes);

//app.use(passport.initialize());
//app.use(passport.session());

//passport.use(new passportLocal.Strategy({
//	usernameField: 'username',
//	passwordField: 'password'
//},
//	function(username, password, done){
//		User.find( { where: { username: username}} )
//			.success(function(user) {
//			
//				if (!user)
//					return done(null, false, {message: "The user is not exist"});
//				else if (!hashing.compare(password, user.password))
//					return done(null, false, {message: "Wrong password"});
//				else
//					return done(null, user);
//		})
//		.error(function(err){
//			return done(err);
//		});
//}));
//
//passport.serializeUser(function(user, done) {
//	done(null, user.id);
//});
//
//passport.deserializeUser(function(id, done) {
//	User.find(id)
//		.success(function(user) {
//			done(null, user);
//		}).error(function(err) {
//			done(new Error('User' + id + 'does not exist'));
//		});
//});


// login request
//app.get('/', function(req, res) {
//	res.render('index', {
//		isAuthenticated: req.isAuthenticated(),
//		user: req.user
//	});
//});
//
//app.get('/login', function(req, res) {
//	if (req.user) {
//		res.redirect('/');
//	} else {
//		res.render('login', {message: req.session.messages });
//		req.session.messages = null;
//	}
//});
//
//app.post('/login', loginPost);
//
//function loginPost(req, res, next) {
//  // ask passport to authenticate
//  passport.authenticate('local', function(err, user, info) {
//    if (err) {
//      // if error happens
//      return next(err);
//    }
//    
//    if (!user) {
//      // if authentication fail, get the error message that we set
//      // from previous (info.message) step, assign it into to
//      // req.session and redirect to the login page again to display
//      req.session.messages = info.message;
//      return res.redirect('/login');
//    }
//
//    // if everything's OK
//    req.logIn(user, function(err) {
//      if (err) {
//        req.session.messages = "Error";
//        return next(err);
//      }
//
//      // set the message
//      req.session.messages = "Login successfully";
//      return res.redirect('/');
//    });
//    
//  })(req, res, next);
//}
//
//app.get('/logout', logout);
//
//function logout(req, res){
//  if(req.isAuthenticated()){
//    req.logout();
//    req.session.messages = req.i18n.__("Log out successfully");
//  }
//    res.redirect('/');
//}

// if you get a request for the sampleResponse page, call the 'displayResponse' function present in the 'sampleRoute' route
app.get('/sampleResponse', sample.displayResponse);
app.get('/homeworkResponse', homework.displayResponse);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
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
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
