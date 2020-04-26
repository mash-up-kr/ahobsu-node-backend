import { Router } from 'express';
import ctrl from './arts.controller';

const router = Router();

router.get('/', ctrl.get);

export default router;
