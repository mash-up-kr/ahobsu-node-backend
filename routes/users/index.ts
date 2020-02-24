import { Router } from 'express';
import checkToken from '../../middleware/checkToken';
import ctrl from './users.controller';

const router = Router();

router.get('/', checkToken, ctrl.users);
router.get('/my', checkToken, ctrl.my);
router.get('/:id', checkToken, ctrl.user);
router.put('/', checkToken, ctrl.update);
router.put('/refresh', checkToken, ctrl.refresh);
router.delete('/', checkToken, ctrl.destroy);

export default router;
