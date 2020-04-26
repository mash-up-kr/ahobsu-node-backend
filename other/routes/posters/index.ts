import { Router } from 'express';
import ctrl from './posters.controller';

const router = Router();

router.get('/', ctrl.get);

export default router;
