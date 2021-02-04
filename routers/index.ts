import { NextFunction, Request, Response, Router } from 'express';
import response from '../lib/response';
import answerRouter from './answers';
import filesRouter from './files';
import missionRouter from './missions';
import questionRouter from './questions';
import signInRouter from './signIn';
import usersRouter from './users';

const router = Router();
router.use('*', (req, res, next) => {
  if (req.headers.test === 'test') {
    next();
    return;
  }
  if (!!req.headers.appVersion) {
    res.status(400).json(response({ status: 1200, message: '앱 버전 업데이트가 필요합니다.' }));
    return;
  }
  next();
});
router.use('/answers', answerRouter);
router.use('/files', filesRouter);
router.use('/missions', missionRouter);
router.use('/questions', questionRouter);
router.use('/signIn', signInRouter);
router.use('/users', usersRouter);

export default router;

// interface MyRequest extends Request {
//   user?: {
//     id: number;
//   };
// }

export interface RequestResponseNext {
  (req: Request, res: Response, next: NextFunction): any;
}
