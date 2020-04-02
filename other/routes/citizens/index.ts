import { Router } from 'express';
import ctrl from './citizens.controller';

const router = Router();

router.get('/', ctrl.get);

export default router;
