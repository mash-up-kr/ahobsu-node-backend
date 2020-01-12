const express = require('express');
const moment = require('moment');
const { Op } = require('sequelize');
const formidable = require('formidable');
const AWS = require('aws-sdk');
const path = require('path');
const fs = require('fs');

const db = require('../models');
const response = require('../lib/response');
const checkToken = require('../middleware/checkToken');

const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

const router = express.Router();

router.get('/week', checkToken, async (req, res, next) => {
  // db에서 해당 날짜 데이터 조회!
  const date = moment().format('YYYY-MM-DD');
  const firstDay = date.add(-1, 'days').format('YYYY-MM-DD');
  const lastDay = date.add(7, 'days').format('YYYY-MM-DD');
  try {
    const files = await db.files.findAll({
      where: {
        date: {
          [Op.gt]: firstDay,
          [Op.lt]: lastDay,
        },
      },
    });
    res.json(response({ data: files }));
  } catch (e) {
    console.log(e);
    res.json(response({ status: 500, message: e.message }));
  }
});

router.post('/', checkToken, async (req, res, next) => {
  AWS.config.update({
    accessKeyId: process.env.AWSAccessKeyId,
    secretAccessKey: process.env.AWSSecretKey,
  });
  const s3 = new AWS.S3();

  let fileName = '';
  for (let i = 0; i < 8; i += 1) fileName += possible.charAt(Math.floor(Math.random() * possible.length));
  const form = new formidable.IncomingForm();
  form.parse(req, async (err, fields, files) => {
    try {
      const fileDate = await db.files.findAll({
        where: {
          date: fields.date,
        },
      });
      if (fileDate.length > 0) {
        return res.json(response({ status: 500, message: '해당날짜에 이미지가 이미 있습니다.' }));
      }

      const { file } = files;
      const { date, cycle } = fields;
      if (!file || !date || !cycle) {
        return res.json(response({ status: 412, message: '필수 파라미터가 없습니다.' }));
      }
      const defaultPath = fileName;
      const imgUrl = defaultPath + path.parse(file.name).ext;
      s3.upload(
        {
          Bucket: process.env.buket,
          Key: imgUrl,
          ACL: 'public-read',
          Body: fs.createReadStream(file.path),
        },
        (error, result) => {
          if (error) console.log(error);
          else console.log(result);
        },
      );
      const baseUrl = 'https://yuchocopie.s3.ap-northeast-2.amazonaws.com/';
      const imageUrl = baseUrl + imgUrl;
      const fileObj = await db.files.create({ imageUrl, date, cycle: parseInt(cycle, 10) });

      // unlink tmp files
      fs.unlinkSync(file.path);
      res.json(response({ data: fileObj }));
    } catch (e) {
      console.log(e);
      res.json(response({ status: 500, message: e.message }));
    }
  });
});

router.put('/:id', checkToken, async (req, res, next) => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) {
    return res.json(response({ status: 412, message: 'id가 올바르지 않습니다.' }));
  }
  AWS.config.update({
    accessKeyId: process.env.AWSAccessKeyId,
    secretAccessKey: process.env.AWSSecretKey,
  });
  const s3 = new AWS.S3();

  let fileName = '';
  for (let i = 0; i < 8; i += 1) fileName += possible.charAt(Math.floor(Math.random() * possible.length));
  const form = new formidable.IncomingForm();
  form.parse(req, async (err, fields, files) => {
    try {
      const { file } = files;
      const { cycle } = fields;
      if (!file || !cycle) {
        return res.json(response({ status: 412, message: '필수 파라미터가 없습니다.' }));
      }
      const defaultPath = fileName;
      const imgUrl = defaultPath + path.parse(file.name).ext;
      s3.upload(
        {
          Bucket: process.env.buket,
          Key: imgUrl,
          ACL: 'public-read',
          Body: fs.createReadStream(file.path),
        },
        (error, result) => {
          if (error) console.log(error);
          else console.log(result);
        },
      );
      const baseUrl = 'https://yuchocopie.s3.ap-northeast-2.amazonaws.com/';
      const imageUrl = baseUrl + imgUrl;
      await db.files.update(
        {
          imageUrl,
          cycle: parseInt(cycle, 10),
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
      res.json(response({ data: fileObj }));
    } catch (e) {
      console.log(e);
      res.json(response({ status: 500, message: e.message }));
    }
  });
});

router.delete('/:id', checkToken, async (req, res, next) => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) {
    return res.json(response({ status: 412, message: 'id가 올바르지 않습니다.' }));
  }
  try {
    const file = await db.files.findOne({
      where: { id },
    });
    if (!file) {
      await db.files.destroy({
        where: {
          id,
        },
      });
      return res.json({ message: 'file이 존재하지 않습니다' });
    }
    res.json(response({ message: '파일을 삭제 했습니다.' }));
  } catch (e) {
    console.log(e);
    res.json(response({ status: 500, message: e.message }));
  }
});

module.exports = router;
