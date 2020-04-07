import { Router } from 'express';
import ctrl from './musics.controller';

const router = Router();

router.get('/', ctrl.get);

export default router;
