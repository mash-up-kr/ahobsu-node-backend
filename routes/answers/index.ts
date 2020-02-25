import { Router } from 'express';
import checkToken from '../../middleware/checkToken';
import imageUploader from '../../middleware/imageUploader';
import answersController from './answers.ctroller';
import {
  checkId,
  checkMissionId,
  checkRequiredoneOfThem,
  existAnswerByDateAndUserId,
  existAnswerByIdAndUserId,
} from './answers.middleware';

const router = Router();

router.get('/week', checkToken, answersController.week);
router.get('/month', checkToken, answersController.month);
router.get('/:date', checkToken, answersController.date);
router.post(
  '/',
  checkToken,
  imageUploader,
  checkRequiredoneOfThem,
  existAnswerByDateAndUserId,
  checkMissionId,
  answersController.create,
);
router.put(
  '/:id',
  checkToken,
  imageUploader,
  checkId,
  checkRequiredoneOfThem,
  existAnswerByIdAndUserId,
  answersController.update,
);
router.delete('/:id', checkToken, checkId, existAnswerByIdAndUserId, answersController.destroy);

export default router;
