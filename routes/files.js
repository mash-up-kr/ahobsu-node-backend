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
  const date = moment().format('YYYY-MM-DD');
  const day = moment().day();
  let first = -7;
  let last = 1;
  if (day != 0) {
    first = day * -1;
    last = 8 - day;
  }

  const firstDay = await moment(date)
    .add(first, 'days')
    .format('YYYY-MM-DD');
  const lastDay = await moment(date)
    .add(last, 'days')
    .format('YYYY-MM-DD');
  const files = await db.files.findAll({
    where: {
      date: {
        [Op.gt]: firstDay,
        [Op.lt]: lastDay,
      },
    },
  });

  // res.json(response({ data: files }));
  res.json(
    response({
      data: [
        {
          id: 48,
          cardUrl: 'https://yuchocopie.s3.ap-northeast-2.amazonaws.com/ur4tLr0T.pdf',
          date: firstDay,
          updatedAt: '2020-01-27T09:04:37.768Z',
          createdAt: '2020-01-27T09:04:37.768Z',
        },
        {
          id: 49,
          cardUrl: 'https://yuchocopie.s3.ap-northeast-2.amazonaws.com/QUf7VIPf.pdf',
          date: firstDay + 1,
          updatedAt: '2020-01-27T09:05:27.908Z',
          createdAt: '2020-01-27T09:05:27.908Z',
        },
        {
          id: 50,
          cardUrl: 'https://yuchocopie.s3.ap-northeast-2.amazonaws.com/J9smJXN7.pdf',
          date: firstDay + 2,
          updatedAt: '2020-01-27T09:05:56.070Z',
          createdAt: '2020-01-27T09:05:56.070Z',
        },
        {
          id: 51,
          cardUrl: 'https://yuchocopie.s3.ap-northeast-2.amazonaws.com/RSUpmgOV.pdf',
          date: firstDay + 3,
          updatedAt: '2020-01-27T09:06:16.595Z',
          createdAt: '2020-01-27T09:06:16.595Z',
        },
        {
          id: 52,
          cardUrl: 'https://yuchocopie.s3.ap-northeast-2.amazonaws.com/O9zJk5Nb.pdf',
          date: firstDay + 4,
          updatedAt: '2020-01-27T09:06:38.387Z',
          createdAt: '2020-01-27T09:06:38.387Z',
        },
        {
          id: 53,
          cardUrl: 'https://yuchocopie.s3.ap-northeast-2.amazonaws.com/LVBFZ7ni.pdf',
          date: firstDay + 5,
          updatedAt: '2020-01-27T09:06:59.914Z',
          createdAt: '2020-01-27T09:06:59.914Z',
        },
        {
          id: 54,
          cardUrl: 'https://yuchocopie.s3.ap-northeast-2.amazonaws.com/710Cz1v5.pdf',
          date: firstDay + 6,
          updatedAt: '2020-01-27T09:07:22.995Z',
          createdAt: '2020-01-27T09:07:22.995Z',
        },
      ],
    }),
  );
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
        return res.json(response({ status: 400, message: '해당날짜에 이미지가 이미 있습니다.' }));
      }

      const { file } = files;
      const { date } = fields;
      if (!file || !date) {
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
      const cardUrl = baseUrl + imgUrl;
      const fileObj = await db.files.create({ cardUrl, date });

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
      if (!file) {
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
      const cardUrl = baseUrl + imgUrl;
      await db.files.update(
        {
          cardUrl,
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
      return res.json({ message: 'file이 존재하지 않습니다' });
    }
    await db.files.destroy({
      where: {
        id,
      },
    });
    res.json(response({ message: '파일을 삭제 했습니다.' }));
  } catch (e) {
    console.log(e);
    res.json(response({ status: 500, message: e.message }));
  }
});

router.get('/:date', checkToken, async (req, res, next) => {
  const { date } = req.params;
  try {
    const file = await db.files.findOne({
      where: { date },
    });
    res.json(response({ data: file }));
  } catch (e) {
    console.log(e);
    res.json(response({ status: 500, message: e.message }));
  }
});

module.exports = router;
