import { Router } from 'express';

const router = Router();

import ctrl from './signIn.controller';

router.post('/refresh', ctrl.refresh);
router.post('/', ctrl.create);

export default router;
