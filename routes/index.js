const { Router } = require('express');

const usersRouter = require('./users');
const filesRouter = require('./files');
const siginInRouter = require('./signIn');
const missionRouter = require('./missions');
const answerRouter = require('./answers');

const checkToken = require('../middleware/checkToken');

const router = Router();

router.use('/users', usersRouter);
router.use('/files', filesRouter);
router.use('/signIn', siginInRouter);
router.use('/missions', missionRouter);
router.use('/answers', answerRouter);

module.exports = router;
