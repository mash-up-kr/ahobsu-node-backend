import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import createError from 'http-errors';
import logger from 'morgan';
import path from 'path';
import swaggerUi from 'swagger-ui-express';
import connectDB from './connectDB';
import reutes from './routes';
import swaggerDocument from './swagger/swagger';
require('dotenv').config();

const app = express();

app.use(cors());
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
app.use(function(err: Error, req: Request, res: Response, next: NextFunction) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  // res.status(err.status || 500);
  res.status(500);
  res.render('error');
});

export default app;
