import { Router } from 'express';
import checkId from '../../middleware/checkId';
import checkToken from '../../middleware/checkToken';
import imageUploader from '../../middleware/imageUploader';
import answersController from './answers.ctroller';
import {
  checkmissionId,
  checkRequiredoneOfThem,
  existAnswerByDateAnduserId,
  existAnswerByIdAnduserId,
} from './answers.middleware';

const router = Router();

router.get('/week', checkToken, answersController.week);
router.get('/list', checkToken, answersController.list);
router.get('/list/:id', checkToken,checkId, answersController.listId);
router.get('/month', checkToken, answersController.month);
router.get('/', checkToken, answersController.date);
router.post(
  '/',
  checkToken,
  imageUploader,
  checkRequiredoneOfThem,
  existAnswerByDateAnduserId,
  checkmissionId,
  answersController.create,
);
router.get('/:id', checkToken, checkId, answersController.get);
router.put(
  '/:id',
  checkToken,
  imageUploader,
  checkId,
  checkRequiredoneOfThem,
  existAnswerByIdAnduserId,
  answersController.update,
);
router.delete('/:id', checkToken, checkId, existAnswerByIdAnduserId, answersController.destroy);

export default router;
