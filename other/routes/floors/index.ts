import { Router } from 'express';
import ctrl from './floors.controller';

const router = Router();

router.get('/', ctrl.get);

export default router;
