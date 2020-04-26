import { NextFunction, Request, Response, Router } from 'express';
import citizensRouter from './citizens';
import designsRouter from './designs';
import fishsRouter from './fishs';
import insectsRouter from './insects';
import musicsRouter from './musics';
import fossilRouter from './fossils';
import artRouter from './arts';
import bottomsRouter from './bottoms';
import dressUpsRouter from './dressUps';
import fencingsRouter from './fencings';
import floorsRouter from './floors';
import headwearsRouter from './headwears';
import housewaresRouter from './housewares';
import photosRouter from './photos';
import postersRouter from './posters';
import rugsRouter from './rugs';
import sundriesRouter from './sundries';
import toolsRouter from './tools';
import topsRouter from './tops';
import wallMountedsRouter from './wallMounteds';
import wallpapersRouter from './wallpapers';
// import siginInRouter from './signIn';
// import usersRouter from './users';

const router = Router();

router.use('/wallpapers', wallpapersRouter);
router.use('/wallMounteds', wallMountedsRouter);
router.use('/tops', topsRouter);
router.use('/tools', toolsRouter);
router.use('/sundries', sundriesRouter);
router.use('/rugs', rugsRouter);
router.use('/posters', postersRouter);
router.use('/photos', photosRouter);
router.use('/housewares', housewaresRouter);
router.use('/headwears', headwearsRouter);
router.use('/floors', floorsRouter);
router.use('/fencings', fencingsRouter);
router.use('/dressUps', dressUpsRouter);
router.use('/bottoms', bottomsRouter);
router.use('/arts', artRouter);
router.use('/fossils', fossilRouter);
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
