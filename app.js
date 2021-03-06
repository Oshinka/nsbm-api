require('./database/connection');
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require("cors");
var SwaggerUi = require('swagger-ui-express');

var indexRouter = require('./routes/index');
var studentsRouter = require('./routes/students');
var lecturersRouter = require('./routes/lecturers');
var subjectsRouter = require('./routes/subjects');
var paymentsRouter = require('./routes/payments');
var pdfDocument = require('./routes/pdfGenerator');
var qrCode = require('./routes/qrGenerator');
var sms = require('./routes/smsGenerator');
var subscribersRouter = require('./routes/subscribers');
var swaggerJSDoc = require('swagger-jsdoc');
var swaggerOptions = require('./swagger');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/students', studentsRouter);
app.use('/lecturers', lecturersRouter);
app.use('/subjects', subjectsRouter);
app.use('/payments', paymentsRouter);
app.use('/subscribers', subscribersRouter);
app.use('/receipt', pdfDocument);
app.use('/qrcode', qrCode);
app.use('/sms', sms);

// swagger documentation
const swaggerDocs = swaggerJSDoc(swaggerOptions);
app.use('/api-docs', SwaggerUi.serve, SwaggerUi.setup(swaggerDocs));

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
