const express = require('express');
const router = express.Router();

const ctrl = require('./files.ctrl');
const checkToken = require('../../middleware/checkToken');
const imageUploader = require('../../middleware/imageUploader');

router.get('/:date', checkToken, ctrl.date);
router.post('/', checkToken, imageUploader, ctrl.create);
router.put('/:id', checkToken, imageUploader, ctrl.update);
router.delete('/:id', checkToken, ctrl.destroy);

export default router;
