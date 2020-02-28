import { Router } from 'express';
import checkToken from '../../middleware/checkToken';
import imageUploaderLiveName from '../../middleware/imageUploaderLiveName';
import filesController from './files.controller';
import { checkRequire, checkPart, checkId, checkFile } from './files.middleware';

const router = Router();

// router.get('/:date', checkToken, ctrl.date);
router.post('/', checkToken, imageUploaderLiveName, checkPart, checkRequire, filesController.create);
router.put(
  '/:id',
  checkToken,
  imageUploaderLiveName,
  checkId,
  checkPart,
  checkRequire,
  checkFile,
  filesController.update,
);
router.delete('/:id', checkToken, checkId, checkFile, imageUploaderLiveName, filesController.destroy);

export default router;
