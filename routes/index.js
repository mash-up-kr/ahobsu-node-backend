const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({ name: '유정' });
});

router.get('/favicon.ico', function(req, res, next) {});

module.exports = router;
