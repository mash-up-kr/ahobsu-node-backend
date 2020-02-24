import { Router } from 'express';
import checkToken from '../../middleware/checkToken';
import imageUploader from '../../middleware/imageUploader';
import answersController from './answers.ctroller';

const router = Router();

router.get('/week', checkToken, answersController.week);
router.get('/month', checkToken, answersController.month);
router.get('/:date', checkToken, answersController.date);
router.post('/', checkToken, imageUploader, answersController.create);
router.put('/:id', checkToken, imageUploader, answersController.update);
router.delete('/:id', checkToken, answersController.destroy);

export default router;
