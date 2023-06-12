var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session') 

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var addUserRouter = require('./routes/addUser');
var editUserRouter = require('./routes/editUser')
var listCarRouter = require('./routes/listCar')
var registryRouter = require('./routes/registry')
var infoCarRouter = require('./routes/viewCar')

var app = express();

app.use(session({
  secret : 'registrytotal',
  resave : true,
  saveUninitialized : true,
  cookie : { secure: false, maxAge: 360000 } 
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
// app.use('/users', usersRouter);
app.use('/admin/user', addUserRouter)
app.use('/admin/edit/:id', editUserRouter)
app.use('/admin/car', listCarRouter)
app.use('/admin/registrytotal', registryRouter)
app.use('/home', infoCarRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
