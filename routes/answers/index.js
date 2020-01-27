const express = require('express');
const router = express.Router();
const ctrl = require('./answers.ctrl');

const checkToken = require('../../middleware/checkToken');

router.get('/week', checkToken, ctrl.week);
router.get('/month', checkToken, ctrl.month);
router.get('/:date', checkToken, ctrl.date);
router.post('/', checkToken, ctrl.create);
router.put('/:id', checkToken, ctrl.update);
router.delete('/:id', checkToken, ctrl.destroy);

module.exports = router;

//const month = async (req, res, next) => {
