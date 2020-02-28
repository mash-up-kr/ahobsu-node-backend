import { Router } from 'express';
import checkId from '../../middleware/checkId';
import checkToken from '../../middleware/checkToken';
import ctrl from './users.controller';
import { checkBody, checkUser } from './users.middleware';

const router = Router();

router.get('/', checkToken, ctrl.users);
router.get('/my', checkToken, ctrl.my);
router.get('/:id', checkToken, checkId, ctrl.user);
router.put('/', checkToken, checkBody, checkUser, ctrl.update);
router.put('/refresh', checkToken, checkUser, ctrl.refresh);
router.delete('/', checkToken, checkUser, ctrl.destroy);

export default router;
