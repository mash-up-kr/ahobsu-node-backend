import { Router } from 'express';
import ctrl from './files.ctrl';
const checkToken = require('../../middleware/checkToken');
const imageUploader = require('../../middleware/imageUploader');

const router = Router();
// router.get('/:date', checkToken, ctrl.date);
router.post('/', checkToken, imageUploader, ctrl.create);
router.put('/:id', checkToken, imageUploader, ctrl.update);
router.delete('/:id', checkToken, ctrl.destroy);

export default router;
