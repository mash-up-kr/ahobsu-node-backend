import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Express, NextFunction, Request, Response } from 'express';
import session from 'express-session';
import helmet from 'helmet';
import hpp from 'hpp';
import createError from 'http-errors';
import logger from 'morgan';
import path from 'path';
import swaggerUi from 'swagger-ui-express';
import connectDB from './connectDB';
import routers from './routers';
import swaggerDocument from './swagger/swagger';
import * as Sentry from '@sentry/node';
import * as Tracing from '@sentry/tracing';

class App {
  app: Express;

  constructor() {
    this.app = express();

    // db 접속
    this.dbConnection();

    // 뷰 템플릿 엔진 셋팅
    // this.setViewEngine();

    // 미들웨어 셋팅
    this.setMiddleWare();

    // 세션 셋팅
    // this.setSession();

    // 위의 라우팅에서 해당 라우터가 없으면 404 페이지를 찾을수가 없음 노출
    this.status404();
  }

  dbConnection() {
    // connect To DB
    connectDB();
  }

  setSession() {
    const sessionOption = {
      resave: false,
      saveUninitialized: false,
      secret: process.env.COOKIE_SECRET || '',
      cookie: {
        httpOnly: true,
        secure: false,
      },
      proxy: false,
    };
    if (process.env.NODE_ENV == 'production') {
      sessionOption.proxy = true;
      // sessionOption.cookie.secure = true;
    }
    this.app.use(session(sessionOption));
  }

  setMiddleWare() {
    this.app.use(
      cors({
        origin: true,
        credentials: true,
      }),
    );
    if (process.env.NODE_ENV === 'production') {
      this.app.enabled('trust proxy');
      this.app.use(logger('combined'));
      this.app.use(helmet({ contentSecurityPolicy: false }));
      this.app.use(hpp());
    } else {
      this.app.use(logger('dev'));
    }
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(cookieParser(process.env.COOKIE_SECRET || ''));

    if (process.env.NODE_ENV === 'production') {
      Sentry.init({
        dsn: process.env.DSN,
        // integrations: [
        // enable HTTP calls tracing
        // new Sentry.Integrations.Http({ tracing: true }),
        // enable Express.js middleware tracing
        // new Tracing.Integrations.Express({ app: this.app }),
        // ],

        // We recommend adjusting this value in production, or using tracesSampler
        // for finer control
        tracesSampleRate: 1.0,
      });
    }

    // this.app.use(Sentry.Handlers.requestHandler());
    // this.app.use(Sentry.Handlers.tracingHandler());

    // 정적 디렉토리 추가
    this.setStatic();

    // 글로벌 변수 선언
    // this.setLocals();

    // 라우팅
    this.getRouting();

    // The error handler must be before any other error middleware and after all controllers
    if (process.env.NODE_ENV === 'production') {
      this.app.use(Sentry.Handlers.errorHandler());
    }

    // error handler
    this.app.use(function (err: Error, req: Request, res: Response, next: NextFunction) {
      // set locals, only providing error in development
      res.locals.message = err.message;
      res.locals.error = req.app.get('env') === 'development' ? err : {};

      // render the error page
      // res.status(err.status || 500);
      res.statusCode = 500;
      res.end((res as any).sentry + '\n');
    });
  }

  setStatic() {
    this.app.use(express.static(path.join(__dirname, 'public')));
  }

  getRouting() {
    this.app.use('/apiDocs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

    this.app.get('/', async (req, res, next) => {
      res.json({});
    });

    this.app.get('/favicon.ico', function (req, res, next) {});
    this.app.get('/service-worker.js', function (req, res, next) {});
    this.app.use('/api/v1', routers);
    this.app.get('/debug-sentry', function mainHandler(req, res) {
      throw new Error('My first Sentry error!');
    });
  }

  status404() {
    // catch 404 and forward to error handler
    this.app.use(function (req, res, next) {
      next(createError(404));
    });
  }
}

const { app } = new App();

export default app;
