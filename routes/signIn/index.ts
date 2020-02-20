const express = require('express');
const router = express.Router();

const ctrl = require('./signIn.ctrl');

router.post('/refresh', ctrl.refresh);
router.post('/', ctrl.create);

export default router;
