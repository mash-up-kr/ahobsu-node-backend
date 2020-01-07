const { Router } = require('express');

const usersRouter = require('./users');
const filesRouter = require('./files');
const siginInRouter = require('./signIn');
const missionRouter = require('./missions');
const answerRouter = require('./answers.js');

const checkToken = require('../middleware/checkToken');

const router = Router();

router.use('/users', usersRouter);
router.use('/files', filesRouter);
router.use('/signIn', siginInRouter);
router.use('/missions', missionRouter);
router.use('/answers', answerRouter);

router.get('/', checkToken, function(req, res, next) {
  res.json({ name: '유정' });
});

router.get('/favicon.ico', function(req, res, next) {});

module.exports = router;
