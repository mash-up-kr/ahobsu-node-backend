const express = require('express');
const moment = require('moment');
const { Op } = require('sequelize');
const formidable = require('formidable');
const AWS = require('aws-sdk');
const path = require('path');
const fs = require('fs');

const db = require('../models');
const checkToken = require('../middleware/checkToken');
const response = require('../lib/response');

const router = express.Router();

const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

router.get('/week/:date', checkToken, async (req, res, next) => {
  const { date } = req.params;
  const userId = req.user.id;
  const firstDay = await moment(date)
    .add(-1, 'days')
    .format('YYYY-MM-DD');
  const lastDay = await moment(date)
    .add(7, 'days')
    .format('YYYY-MM-DD');
  const answers = await db.answers.findAll({
    where: {
      userId,
      date: {
        [Op.gt]: firstDay,
        [Op.lt]: lastDay,
      },
    },
  });
  res.json(response({ data: answers }));
});

router.get('/:date', checkToken, async (req, res, next) => {
  const userId = req.user.id;
  const answer = await db.answers.findAll({
    where: {
      userId,
      date: req.params.date,
    },
  });
  res.json(response({ data: answer }));
});

router.post('/', checkToken, async (req, res, next) => {
  const userId = req.user.id;
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
      const { missionId, content } = fields;
      const checkMission = await db.missions.findOne({ where: { id: missionId } });
      if (!checkMission) {
        return res.json(response({ status: 404, message: '존재하지않는 missionId.' }));
      }
      const date = moment()
        .tz('Asia/Seoul')
        .format('YYYY-MM-DD');
      const beforeAnswer = await db.answers.findOne({
        where: {
          userId,
          date,
        },
      });
      if (!!beforeAnswer) {
        return res.json(response({ status: 404, message: '해당날짜에 답변이 존재합니다.' }));
      }
      const image = files.imageUrl;
      if (!image && !content) {
        return res.json(response({ status: 404, message: '필수 파라미터가 부족합니다.' }));
      }
      if (!image) {
        const answer = await db.answers.create({
          userId,
          missionId,
          content,
          date,
        });
        return res.json(response({ data: answer }));
      }
      const { imageUrl } = files;
      const defaultPath = fileName;
      const imageUrl2 = defaultPath + path.parse(imageUrl.name).ext;
      s3.upload(
        {
          Bucket: process.env.buket,
          Key: imageUrl2,
          ACL: 'public-read',
          Body: fs.createReadStream(imageUrl.path),
        },
        (error, result) => {
          if (error) console.log(error);
          else console.log(result);
        },
      );
      const baseUrl = 'https://yuchocopie.s3.ap-northeast-2.amazonaws.com/';
      const imgUrl = baseUrl + imageUrl2;

      const answer = await db.answers.create({
        userId: userId,
        missionId: missionId,
        imageUrl: imgUrl,
        content: fields.content,
        date: date,
      });
      // unlink tmp files
      fs.unlinkSync(imageUrl.path);
      res.json(response({ data: answer }));
    } catch (e) {
      console.log(e);
      return res.json(response({ status: 500, message: e.message }));
    }
  });
});

router.put('/:id', checkToken, async (req, res, next) => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) {
    return res.json(response({ status: 412, message: 'id가 올바르지 않습니다.' }));
  }
  const answer = await db.answers.findOne({ where: { id } });
  if (!answer) {
    return res.json(response({ status: 404, message: '존재하지않는 answerId.' }));
  }
  const userId = req.user.id;
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
      const image = files.imageUrl;
      if (!image && !fields.content) {
        return res.json(response({ status: 404, message: '필수 파라미터가 부족합니다.' }));
      }
      if (!image) {
        await db.answers.update(
          {
            userId: userId,
            missionId: fields.missionId,
            content: fields.content,
          },
          {
            where: {
              id,
            },
          },
        );
        const newAnswer = await db.answers.findOne({ where: { id } });
        return res.json(response({ data: newAnswer }));
      }
      const { imageUrl } = files;
      const defaultPath = fileName;
      const imageUrl2 = defaultPath + path.parse(imageUrl.name).ext;
      s3.upload(
        {
          Bucket: process.env.buket,
          Key: imageUrl2,
          ACL: 'public-read',
          Body: fs.createReadStream(imageUrl.path),
        },
        (error, result) => {
          if (error) console.log(error);
          else console.log(result);
        },
      );
      const baseUrl = 'https://yuchocopie.s3.ap-northeast-2.amazonaws.com/';
      const imgUrl = baseUrl + imageUrl2;

      await db.answers.update(
        {
          userId: userId,
          missionId: fields.missionId,
          imageUrl: imgUrl,
          content: fields.content,
        },
        {
          where: {
            id,
          },
        },
      );
      // unlink tmp files
      fs.unlinkSync(imageUrl.path);
      const newAnswer = await db.answers.findOne({ where: { id } });
      return res.json(response({ data: newAnswer }));
    } catch (e) {
      console.log(e);
      return res.json(response({ status: 500, message: e.message }));
    }
  });
});

router.delete('/:id', checkToken, async (req, res, next) => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) {
    return res.json(response({ status: 412, message: 'id가 올바르지 않습니다.' }));
  }
  const userId = req.user.id;
  try {
    const answer = await db.answers.findOne({
      where: {
        id,
        userId,
      },
    });
    if (!answer) {
      await db.answers.destroy({
        where: {
          id,
        },
      });
      return res.json(response({ status: 404, message: '유효하지 않은 answerId' }));
    }
    res.json(response({ message: '답변을 삭제 했습니다.' }));
  } catch (e) {
    console.log(e);
    return res.json(response({ status: 500, message: e.message }));
  }
});

module.exports = router;
