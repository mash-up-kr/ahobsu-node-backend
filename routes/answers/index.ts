const express = require('express');
const router = express.Router();

import ctrl from './answers.ctrl';
const checkToken = require('../../middleware/checkToken');
const imageUploader = require('../../middleware/imageUploader');

router.get('/week', checkToken, ctrl.week);
router.get('/month', checkToken, ctrl.month);
router.get('/:date', checkToken, ctrl.date);
router.post('/', checkToken, imageUploader, ctrl.create);
router.put('/:id', checkToken, imageUploader, ctrl.update);
router.delete('/:id', checkToken, ctrl.destroy);

export default router;
