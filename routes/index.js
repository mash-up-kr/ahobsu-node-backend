const express = require('express');

const checkToken = require('../lib/checkToken');

const router = express.Router();

/* GET home page. */
router.get('/', checkToken, function(req, res, next) {
  res.json({ name: '유정' });
});

router.get('/favicon.ico', function(req, res, next) {});

module.exports = router;
