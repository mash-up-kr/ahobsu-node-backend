import { Router } from 'express';
import ctrl from './fishs.controller';

const router = Router();

router.get('/', ctrl.get);

export default router;
