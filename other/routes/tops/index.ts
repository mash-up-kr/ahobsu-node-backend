import { Router } from 'express';
import ctrl from './tops.controller';

const router = Router();

router.get('/', ctrl.get);

export default router;
