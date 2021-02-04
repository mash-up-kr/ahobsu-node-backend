import { Router } from 'express';
import checkId from '../../middleware/checkId';
import checkToken from '../../middleware/checkToken';
import { checkUser } from '../users/users.middleware';
import ctrl from './missions.controller';
import { checkBody, checkMission } from './missions.middleware';

const router = Router();

router.get('/', checkToken, checkUser, ctrl.missoins);
router.get('/refresh', checkToken, checkUser, ctrl.refresh);
router.get('/:id', checkToken, checkId, ctrl.mission);
router.post('/', checkToken, checkBody, ctrl.create);
router.put('/:id', checkToken, checkId, checkBody, checkMission, ctrl.update);
router.delete('/:id', checkToken, checkId, checkMission, ctrl.destroy);

export default router;
