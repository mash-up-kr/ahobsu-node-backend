import { NextFunction, Request, Response, Router } from 'express';
import citizensRouter from './citizens';
import designsRouter from './designs';
import fishsRouter from './fishs';
import insectsRouter from './insects';
import musicsRouter from './musics';
// import siginInRouter from './signIn';
// import usersRouter from './users';

const router = Router();

router.use('/musics', musicsRouter);
router.use('/designs', designsRouter);
router.use('/citizens', citizensRouter);
router.use('/fishs', fishsRouter);
router.use('/insects', insectsRouter);
// router.use('/signIn', siginInRouter);
// router.use('/users', usersRouter);

export default router;

// interface MyRequest extends Request {
//   user?: {
//     id: number;
//   };
// }

export interface RequestResponseNext {
  (req: Request, res: Response, next: NextFunction): any;
}
