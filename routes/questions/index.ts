import { Router } from 'express';
import ctrl from './questions.controller';

const router = Router();

router.post('/', ctrl.post);

export default router;
