import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Express, NextFunction, Request, Response } from 'express';
import createError from 'http-errors';
import logger from 'morgan';
import path from 'path';
import swaggerUi from 'swagger-ui-express';
import connectDB from './connectDB';
import otherReutes from './other/routes';
import reutes from './routes';
import swaggerDocument from './swagger/swagger';
import { data } from './fossil';
import Fossil from './models/other/fossil';
 import { get } from './copy';
import https from 'https';
import fs from 'fs';
import Design from './models/other/design';
import { Op } from 'sequelize';
// import Design from './models/other/design';

class App {
  app: Express;

  constructor() {
    this.app = express();

    // db 접속
    this.dbConnection();

    // 뷰 템플릿 엔진 셋팅
    // this.setViewEngine();

    // 세션 셋팅
    // this.setSession();

    // 미들웨어 셋팅
    this.setMiddleWare();

    // 정적 디렉토리 추가
    this.setStatic();

    // 글로벌 변수 선언
    // this.setLocals();

    // 라우팅
    this.getRouting();

    // 위의 라우팅에서 해당 라우터가 없으면 404 페이지를 찾을수가 없음 노출
    this.status404();
  }

  dbConnection() {
    // connect To DB
    connectDB();
  }

  setMiddleWare() {
    this.app.use(cors());
    this.app.use(logger('dev'));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(cookieParser());

    // error handler
    this.app.use(function (err: Error, req: Request, res: Response, next: NextFunction) {
      // set locals, only providing error in development
      res.locals.message = err.message;
      res.locals.error = req.app.get('env') === 'development' ? err : {};

      // render the error page
      // res.status(err.status || 500);
      res.status(500);
      res.render('error');
    });
  }

  setStatic() {
    this.app.use(express.static(path.join(__dirname, 'public')));
  }

  getRouting() {
    this.app.use('/apiDocs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

    this.app.get('/', async (req, res, next) => {
      try {
        //const types = [
        //  'Pattern',
        //  'Tank top',
        //  'Short-sleeve tee',
        //  'Long-sleeve dress shirt',
        //  'Sweater',
        //  'Hoodie',
        //  'Coat',
        //  'Sleeveless dress',
        //  'Short-sleeve dress',
        //  'Long-sleeve dress',
        //  'Round dress',
        //  'Balloon-hem dress',
        //  'Robe',
        //  'Brimmed cap',
        //  'Knit cap',
        //  'Brimmed hat',
        //];
        //types.map(async (type) => {
        //  for (let i = 1; i < 100; i++) {
        //    const data = await get(i, type);
        //    console.log(data)
        //    await Promise.all(
        //      data.map(async (d: Design) => {
        //        const design = await Design.findOne({ where: { code: d.code } });
        //        if (design) {
        //        } else if(!!d.imageUrl){
        //          console.log(111, d.imageUrl)
        //          const url = 'https://nooksisland.com' + d.imageUrl;
 
        //          // 저장할 위치를 지정
        //          const savepath = './public/designs/' + d.code + '.jpg';
 
        //          // 출력 지정
        //          const outfile = fs.createWriteStream(savepath);
 
        //          // 비동기로 URL의 파일 다운로드
        //          await https.get(url, function (res: any) {
        //            res.pipe(outfile);
        //            res.on('end', function () {
        //              outfile.close();
        //              console.log('ok');
        //            });
        //          });
 
        //          await Design.create({
        //            title: d.title,
        //            code: d.code,
        //            imageUrl: encodeURI(`https://moti.company/designs/${d.code}.jpg`),
        //            type: d.type,
        //          });
        //        }
        //      }),
        //    );
        //  }
        //});
       
      } catch(e) {
        console.log(e)
      }
      res.json({}); 
    });

    this.app.get('/favicon.ico', function (req, res, next) {});
    this.app.get('/service-worker.js', function (req, res, next) {});

    this.app.use('/api/v1', reutes);
    this.app.use('/api/v2', otherReutes);
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
