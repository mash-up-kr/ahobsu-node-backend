import { Router } from 'express';
import ctrl from './headwears.controller';

const router = Router();

router.get('/', ctrl.get);

export default router;
