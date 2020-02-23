import { Router } from 'express';
import ctrl from './questions.ctrl';

const router = Router();

router.post('/', ctrl.post);

export default router;
