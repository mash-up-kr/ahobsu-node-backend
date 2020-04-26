import { Router } from 'express';
import ctrl from './housewares.controller';

const router = Router();

router.get('/', ctrl.get);

export default router;
