const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger/swagger.js');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const filesRouter = require('./routes/files');
const siginInRouter = require('./routes/signIn');
const missionRouter = require('./routes/missions');
const answerRouter = require('./routes/answers.js');

require('dotenv').config();
const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// connect To DB
// const models = require('./models');
// models.sequelize
//   .sync({ force: true })
//   .then(() => {
//     console.log('✓ DB connection success.');
//     console.log('  Press CTRL-C to stop\n');
//   })
//   .catch(err => {
//     console.error(err);
//     console.log('✗ DB connection error. Please make sure DB is running.');
//     process.exit();
//   });

app.use('/apiDocs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/files', filesRouter);
app.use('/signIn', siginInRouter);
app.use('/missions', missionRouter);
app.use('/answers', answerRouter);

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
