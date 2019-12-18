const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const fs = require('fs');
const jsonPath = require('jsonpath');
const environment = require('./environment/environment');
const oneM2M_handler = require('./public/javascripts/notification-handler/mobius-notificationHandler');
const oneM2M_subscription = require('./public/javascripts/oneM2M/oneM2M-subscription');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

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

fs.readFile('environment/listening-list.json', (err, data) => {
  if (err)
    throw err;
  let listening = JSON.parse(data);
//TODO: possible creation of the discovery methode 
  let mobius_list = jsonPath.value(listening, '$..oneM2M_listening');
  mobius_list.forEach(element => {
    oneM2M_subscription.subscribe(element, (msg) => {
      /**
       case1. created a new subscription
              -->move to next element
       case2. subscription already exist
              -->move to next element
       case3. error
              -->log the error in subscription error log
              -->move to the next element  
       **/
      console.log(element + '........' + msg + '\n');
    });
  });
});



oneM2M_handler.notificationHandler();//TODO: consoling part





module.exports = app;
