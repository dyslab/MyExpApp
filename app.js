var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');
var qrRouter = require('./routes/qrtest');
// validate the file path that constructed via the variable "__dirname".
var barRouter = require(__dirname.replace("\\","/") + '/routes/bartest');
var excelRouter = require('./routes/exceltest');
var excel2antvRouter = require('./routes/excel2antv');
var uploadRouter = require('./routes/upload-server');
var exportRouter = require('./routes/exporttest');
var spnRouter = require('./routes/spntest');
var rgRouter = require('./routes/racinggame-server');
var fontsRouter = require('./routes/fonts');
var emojiRouter = require('./routes/emoji');

var app = express();
app.locals.title = 'myExpApp™ ️💯';

// reset the listing port to 8001
process.env.PORT = 8001

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
// app.use('/users', usersRouter);
app.use('/qr', qrRouter);
app.use('/bar', barRouter);
app.use('/excel', excelRouter);
app.use('/excel2antv', excel2antvRouter);
app.use('/upload', uploadRouter);
app.use('/export', exportRouter);
app.use('/spn', spnRouter);
app.use('/racinggame', rgRouter);
app.use('/fonts', fontsRouter);
app.use('/emoji', emojiRouter);

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

// Display web server information
console.log('\x1b[33;1m%s\x1b[0m Web Server is listening on \x1b[32;1mhttp://localhost:%d\x1b[0m...\n', app.locals.title, process.env.PORT)

module.exports = app;