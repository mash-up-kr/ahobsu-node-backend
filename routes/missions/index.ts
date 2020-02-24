import { Router } from 'express';
import checkToken from '../../middleware/checkToken';
import ctrl from './missions.ctrl';

const router = Router();

router.get('/', checkToken, ctrl.missoins);
router.get('/refresh', checkToken, ctrl.refresh);
router.get('/:id', checkToken, ctrl.mission);
router.post('/', checkToken, ctrl.create);
router.put('/:id', checkToken, ctrl.update);
router.delete('/:id', checkToken, ctrl.destroy);

export default router;
