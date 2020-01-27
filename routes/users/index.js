const express = require('express');
const router = express.Router();
const ctrl = require('./users.ctrl');

const checkToken = require('../../middleware/checkToken');

router.get('/', checkToken, ctrl.users);
router.get('/my', checkToken, ctrl.my);
router.get('/:id', checkToken, ctrl.user);
router.put('/', checkToken, ctrl.update);
router.put('/refresh', checkToken, ctrl.refresh);
router.delete('/', checkToken, ctrl.destroy);

module.exports = router;
