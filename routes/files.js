const express = require('express');
const moment = require('moment');
const { Op } = require('sequelize');
const formidable = require('formidable');
const AWS = require('aws-sdk');
const path = require('path');
const fs = require('fs');

const db = require('../models');
const checkToken = require('../middleware/checkToken');

const router = express.Router();
// console.log(3333, process.env.AWS_KEY);

/* GET users listing. */
router.get('/:date', async (req, res, next) => {
  // db에서 해당 날짜 데이터 조회!
  const { date } = req.params;
  console.log(123, date);
  const firstDay = await moment(date).format('YYYY-MM-DD');
  const lastDay = await moment(date)
    .add(7, 'days')
    .format('YYYY-MM-DD');
  console.log(333, date);
  const file = await db.files.findAll({
    where: {
      date: {
        [Op.gt]: new Date(firstDay),
        [Op.lt]: new Date(lastDay),
      },
    },
  });
  res.json({ file });
});

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
    const fileDate = await db.files.findAll({
      where: {
        date: fields.date,
      },
    });
    console.log(231233, fileDate);
    if (fileDate.length > 0) {
      return res.json({ message: '해당날짜에 이미지가 이미 있습니다.' });
    }

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

router.put('/:id', async (req, res, next) => {
  const id = parseInt(req.params.id, 10);
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
    await db.files.update(
      {
        file: imgUrl,
      },
      {
        where: {
          id,
        },
      },
    );
    const fileObj = await db.files.findOne({ where: { id } });
    // unlink tmp files
    fs.unlinkSync(file.path);
    res.json({ file: fileObj });
  });
});

router.delete('/:id', async (req, res, next) => {
  const id = parseInt(req.params.id, 10);
  const file = await db.files.findOne({
    where: { id },
  });
  if (!!file) {
    const files = await db.files.destroy({
      where: {
        id,
      },
    });
    return res.json({ message: '파일을 삭제 했습니다.' });
  }
  res.json({ message: '유효하지 않은 fileId' });
});
module.exports = router;
