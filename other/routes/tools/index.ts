import { Router } from 'express';
import ctrl from './tools.controller';

const router = Router();

router.get('/', ctrl.get);

export default router;
