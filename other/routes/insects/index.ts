import { Router } from 'express';
import ctrl from './insects.controller';

const router = Router();

router.get('/', ctrl.get);

export default router;
