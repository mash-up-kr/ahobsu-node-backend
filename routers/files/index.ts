import { Router } from 'express';
import checkId from '../../middleware/checkId';
import imageUploaderLiveName from '../../middleware/imageUploaderLiveName';
import filesController from './files.controller';
import { checkFile, checkPart, checkRequire } from './files.middleware';

const router = Router();

// router.get('/:date', checkToken, ctrl.date);
router.post('/', imageUploaderLiveName, checkRequire, filesController.create);
router.put('/svg/:id', imageUploaderLiveName, checkId, checkPart, checkRequire, checkFile, filesController.updateSvg);
router.put('/:id', imageUploaderLiveName, checkId, checkPart, checkRequire, checkFile, filesController.update);
router.delete('/:id', checkId, checkFile, imageUploaderLiveName, filesController.destroy);

export default router;
