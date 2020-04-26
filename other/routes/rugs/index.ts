import { Router } from 'express';
import ctrl from './rugs.controller';

const router = Router();

router.get('/', ctrl.get);

export default router;
