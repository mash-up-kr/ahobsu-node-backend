const express = require('express');
const router = express.Router();
const ctrl = require('./files.ctrl');

const checkToken = require('../../middleware/checkToken');

router.get('/week', checkToken, ctrl.week);
router.post('/', checkToken, ctrl.create);
router.put('/:id', checkToken, ctrl.update);
router.get('/:date', checkToken, ctrl.date);
router.delete('/:id', checkToken, ctrl.destroy);

module.exports = router;
