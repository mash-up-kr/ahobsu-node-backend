import { Router } from 'express';
import ctrl from './sundries.controller';

const router = Router();

router.get('/', ctrl.get);

export default router;
