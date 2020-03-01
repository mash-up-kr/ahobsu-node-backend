import { Router } from 'express';
import ctrl from './questions.controller';

const router = Router();

router.post('/', ctrl.post);
router.get('/:page', ctrl.get);

export default router;
