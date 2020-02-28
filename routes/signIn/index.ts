import { Router } from 'express';

const router = Router();

import ctrl from './signIn.controller';
import { checkToken, checkBody } from './signin.middleware';

router.post('/refresh', checkToken, ctrl.refresh);
router.post('/', checkToken, checkBody, ctrl.create);

export default router;
