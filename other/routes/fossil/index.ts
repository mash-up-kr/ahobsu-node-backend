import { Router } from 'express';
import ctrl from './fossil.controller';

const router = Router();

router.get('/', ctrl.get);

export default router;
