import { Router } from 'express';
import checkToken from '../../middleware/checkToken';
import imageUploaderLiveName from '../../middleware/imageUploaderLiveName';
import filesController from './files.controller';

const router = Router();

// router.get('/:date', checkToken, ctrl.date);
router.post('/', checkToken, imageUploaderLiveName, filesController.create);
router.put('/:id', checkToken, imageUploaderLiveName, filesController.update);
router.delete('/:id', checkToken, imageUploaderLiveName, filesController.destroy);

export default router;
