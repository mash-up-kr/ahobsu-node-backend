import { Router } from 'express';

import usersRouter from './users';
import filesRouter from './files';
import siginInRouter from './signIn';
import missionRouter from './missions';
import answerRouter from './answers';

const router = Router();

router.use('/users', usersRouter);
router.use('/files', filesRouter);
router.use('/signIn', siginInRouter);
router.use('/missions', missionRouter);
router.use('/answers', answerRouter);

export default router;
