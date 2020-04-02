import { Router } from 'express';
import ctrl from './designs.controller';

const router = Router();

router.get('/', ctrl.get);

export default router;
