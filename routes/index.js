const { Router } = require('express');

const usersRouter = require('./users');
const filesRouter = require('./files');
const siginInRouter = require('./signIn');
const missionRouter = require('./missions');
const answerRouter = require('./answers');
// const answerRouter = require('./answers/answers.ctrl.js/index.js.js');

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
router.get('/service-worker.js', function(req, res, next) {});

router.get('/hello', (req, res) => {
  res.send('world!');
});

router.get('/status', (req, res) => {
  res.send('ok');
});

module.exports = router;
