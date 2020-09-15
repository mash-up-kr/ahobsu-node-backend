import { Router } from 'express';
import ctrl from './signIn.controller';
import { checkBody, checkToken } from './signin.middleware';

const router = Router();

router.post('/refresh', checkToken, ctrl.refresh);
router.post('/', checkToken, checkBody, ctrl.create);
router.get('/google', ctrl.googleCallback);


export default router;
