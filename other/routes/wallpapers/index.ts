import { Router } from 'express';
import ctrl from './wallMounteds.controller';

const router = Router();

router.get('/', ctrl.get);

export default router;
