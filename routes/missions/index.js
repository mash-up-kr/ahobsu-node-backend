const express = require('express');
const router = express.Router();
const ctrl = require('./missions.ctrl');

const checkToken = require('../../middleware/checkToken');

router.get('/refresh', checkToken, ctrl.refresh);
router.get('/', checkToken, ctrl.missoins);
router.post('/', checkToken, ctrl.create);
router.put('/:id', checkToken, ctrl.update);
router.delete('/:id', checkToken, ctrl.destroy);
router.get('/:id', checkToken, ctrl.mission);

module.exports = router;
