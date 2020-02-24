import { Router } from 'express';
import checkToken from '../../middleware/checkToken';
import imageUploader from '../../middleware/imageUploader';
import ctrl from './files.ctrl';

const router = Router();

// router.get('/:date', checkToken, ctrl.date);
router.post('/', checkToken, imageUploader, ctrl.create);
router.put('/:id', checkToken, imageUploader, ctrl.update);
router.delete('/:id', checkToken, ctrl.destroy);

export default router;
