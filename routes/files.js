const express = require('express');
const formidable = require('formidable');
const AWS = require('aws-sdk');
const path = require('path');
const fs = require('fs');

const db = require('../models');

const router = express.Router();
// console.log(3333, process.env.AWS_KEY);

router.post('/', async (req, res, next) => {
  AWS.config.update({
    accessKeyId: process.env.AWSAccessKeyId,
    secretAccessKey: process.env.AWSSecretKey,
  });
  const s3 = new AWS.S3();

  let fileName = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < 8; i += 1) fileName += possible.charAt(Math.floor(Math.random() * possible.length));
  const form = new formidable.IncomingForm();
  form.parse(req, async (err, fields, files) => {
    const { file } = files;
    const defaultPath = fileName;
    const imageUrl = defaultPath + path.parse(file.name).ext;
    s3.upload(
      {
        Bucket: process.env.buket,
        Key: imageUrl,
        ACL: 'public-read',
        Body: fs.createReadStream(file.path),
      },
      (error, result) => {
        if (error) console.log(error);
        else console.log(result);
      },
    );
    const baseUrl = 'https://yuchocopie.s3.ap-northeast-2.amazonaws.com/';
    const imgUrl = baseUrl + imageUrl;
    console.log(11, fields.date);
    const fileObj = await db.files.create({ file: imgUrl, date: fields.date });

    // unlink tmp files
    fs.unlinkSync(file.path);
    res.json({ file: fileObj });
  });
});

module.exports = router;
