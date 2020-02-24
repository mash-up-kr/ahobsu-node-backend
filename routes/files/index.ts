import { Router } from 'express';
import checkToken from '../../middleware/checkToken';
import imageUploader from '../../middleware/imageUploader';
import filesController from './files.controller';

const router = Router();

// router.get('/:date', checkToken, ctrl.date);
router.post('/', checkToken, imageUploader, filesController.create);
router.put('/:id', checkToken, imageUploader, filesController.update);
router.delete('/:id', checkToken, filesController.destroy);

export default router;
