import { Router } from 'express';
import ctrl from './dressUps.controller';

const router = Router();

router.get('/', ctrl.get);

export default router;
