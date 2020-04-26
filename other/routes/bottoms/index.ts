import { Router } from 'express';
import ctrl from './bottoms.controller';

const router = Router();

router.get('/', ctrl.get);

export default router;
