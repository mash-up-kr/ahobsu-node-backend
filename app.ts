import * as express from 'express';
import * as createError from 'http-errors';
// const createError = require('http-errors');
// const express = require('express');
import * as path from 'path';
// const path = require('path');
import * as cookieParser from 'cookie-parser';
// const cookieParser = require('cookie-parser');
import * as logger from 'morgan';
// const logger = require('morgan');
import * as swaggerUi from 'swagger-ui-express';
// const swaggerUi = require('swagger-ui-express');

const swaggerDocument = require('./swagger/swagger.js');
const connectDB = require('./connectDB');
const reutes = require('./routes');

require('dotenv').config();

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// connect To DB
connectDB();

app.use('/apiDocs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/', (req, res, next) => {
  res.json({ name: '유정' });
});

app.get('/favicon.ico', function(req, res, next) {});
app.get('/service-worker.js', function(req, res, next) {});

app.use('/api/v1', reutes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err: any, req: any, res: any, next: any) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
