const express = require('express');
const formidable = require('formidable');

const db = require('../models');

const router = express.Router();

router.post('/', async (req, res, next) => {
  const form = new formidable.IncomingForm();
  form.parse(req, async (err, fields, files) => {
    const file = files.file;
    console.log(12345, fields.date);
    // Do something !!
    res.json({ message: file.name });
  });
});

module.exports = router;
