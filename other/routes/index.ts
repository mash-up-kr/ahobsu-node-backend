import { NextFunction, Request, Response, Router } from 'express';
import siginInRouter from './signIn';
import usersRouter from './users';
import citizensRouter from './citizens';
import fishsRouter from './fishs';
import insectsRouter from './insects';

const router = Router();

router.use('/citizens', citizensRouter);
router.use('/fishs', fishsRouter);
router.use('/insects', insectsRouter);
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
