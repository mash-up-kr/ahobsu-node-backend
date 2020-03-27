import { NextFunction, Request, Response, Router } from 'express';
import answerRouter from './answers';
import filesRouter from './files';
import missionRouter from './missions';
import questionRouter from './questions';
import siginInRouter from './signIn';
import usersRouter from './users';

const router = Router();

router.use('/answers', answerRouter);
router.use('/files', filesRouter);
router.use('/missions', missionRouter);
router.use('/questions', questionRouter);
router.use('/signIn', siginInRouter);
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
