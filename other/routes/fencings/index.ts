import { Router } from 'express';
import ctrl from './fencings.controller';

const router = Router();

router.get('/', ctrl.get);

export default router;
