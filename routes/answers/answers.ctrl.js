const moment = require('moment');
const { Op } = require('sequelize');
const formidable = require('formidable');
const AWS = require('aws-sdk');
const path = require('path');
const fs = require('fs');

const db = require('../../models');
const response = require('../../lib/response');

const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

const week = async (req, res, next) => {
  try {
    const { firstDay, lastDay, today, first } = getWeekDate();
    const { id: userId } = req.user;
    const answers = await getWeekAnswers({ userId, firstDay, lastDay, today, first });
    res.json(response({ data: { today, answers } }));
  } catch (error) {
    console.log(error.message);
    res.json(response({ status: 500, message: error.message }));
  }
};

const month = async (req, res, next) => {
  try {
    const { id: userId } = req.user;
    const { date: queryDate } = req.query;
    const { weeks, date } = getMonthDate(queryDate);
    const answers = await getMonthAnswers({ weeks, userId });
    res.json(response({ data: { date: date.format('YYYY-MM-DD'), answers } }));
  } catch (error) {
    console.log(error.message);
    res.json(response({ status: 500, message: error.message }));
  }
};

const date = async (req, res, next) => {
  const userId = req.user.id;
  const answer = await db.answers.findOne({
    where: {
      userId,
      date: req.params.date,
    },
    include: [
      {
        model: db.missions,
      },
    ],
  });
  res.json(response({ data: answer }));
};

const create = async (req, res, next) => {
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
        return res.json(response({ status: 412, message: '존재하지않는 missionId.' }));
      }
      const date = moment().format('YYYY-MM-DD');
      const beforeAnswer = await db.answers.findOne({
        where: {
          userId,
          date,
        },
      });
      let cardFile = await db.files.findOne({ where: { date } });
      if (!cardFile) {
        const id = moment().day() === 0 ? 7 : moment().day();
        cardFile = await db.files.findOne({ where: { id } });
      }
      const { cardUrl } = cardFile;
      if (!!beforeAnswer) {
        return res.json(response({ status: 400, message: '해당날짜에 답변이 존재합니다.' }));
      }
      const image = files.file;
      if (!image && !content) {
        return res.json(response({ status: 412, message: '필수 파라미터가 부족합니다.' }));
      }
      if (!image) {
        const answer = await db.answers.create({
          userId,
          missionId,
          cardUrl,
          content,
          date,
        });
        return res.json(response({ data: answer }));
      }
      const { file } = files;
      const defaultPath = fileName;
      const file2 = defaultPath + path.parse(file.name).ext;
      s3.upload(
        {
          Bucket: process.env.buket,
          Key: file2,
          ACL: 'public-read',
          Body: fs.createReadStream(file.path),
        },
        (error, result) => {
          if (error) console.log(error);
          else console.log(result);
        },
      );
      const baseUrl = 'https://yuchocopie.s3.ap-northeast-2.amazonaws.com/';
      const imageUrl = baseUrl + file2;

      const newAnswer = await db.answers.create({
        userId: userId,
        missionId: missionId,
        imageUrl,
        cardUrl,
        content: fields.content,
        date,
      });
      const answer = await db.answers.findOne({
        where: { id: newAnswer.id },
        include: [
          {
            model: db.missions,
          },
        ],
      });
      // unlink tmp files
      fs.unlinkSync(file.path);
      res.json(response({ status: 201, data: answer }));
    } catch (e) {
      console.log(e);
      return res.json(response({ status: 500, message: e.message }));
    }
  });
};
const update = async (req, res, next) => {
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
      const image = files.file;
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
        const newAnswer = await db.answers.findOne({
          where: { id },
          include: [
            {
              model: db.missions,
            },
          ],
        });
        return res.json(response({ data: newAnswer }));
      }
      const { file } = files;
      const defaultPath = fileName;
      const file2 = defaultPath + path.parse(file.name).ext;
      s3.upload(
        {
          Bucket: process.env.buket,
          Key: file2,
          ACL: 'public-read',
          Body: fs.createReadStream(file.path),
        },
        (error, result) => {
          if (error) console.log(error);
          else console.log(result);
        },
      );
      const baseUrl = 'https://yuchocopie.s3.ap-northeast-2.amazonaws.com/';
      const imageUrl = baseUrl + file2;

      await db.answers.update(
        {
          userId: userId,
          missionId: fields.missionId,
          imageUrl,
          content: fields.content,
        },
        {
          where: {
            id,
          },
        },
      );
      // unlink tmp files
      fs.unlinkSync(file.path);
      const newAnswer = await db.answers.findOne({
        where: { id },
        include: [
          {
            model: db.missions,
          },
        ],
      });
      return res.json(response({ data: newAnswer }));
    } catch (e) {
      console.log(e);
      return res.json(response({ status: 500, message: e.message }));
    }
  });
};

const destroy = async (req, res, next) => {
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
      return res.json(response({ status: 404, message: '유효하지 않은 answerId' }));
    }
    await db.answers.destroy({
      where: {
        id,
      },
    });
    res.json(response({ status: 204, message: '답변을 삭제 했습니다.' }));
  } catch (e) {
    console.log(e);
    return res.json(response({ status: 500, message: e.message }));
  }
};

module.exports = { week, month, date, create, update, destroy };

const getWeekDate = () => {
  const today = moment().format('YYYY-MM-DD');
  const day = moment().day();
  let first = -7;
  let last = 1;
  if (day != 0) {
    first = day * -1;
    last = 8 - day;
  }
  const firstDay = moment()
    .add(first, 'days')
    .format('YYYY-MM-DD');
  const lastDay = moment()
    .add(last, 'days')
    .format('YYYY-MM-DD');
  return { firstDay, lastDay, today, first };
};

const getWeekAnswers = async ({ userId, firstDay, lastDay, today, first }) => {
  const ExistAnswers = await db.answers.findAll({
    where: {
      userId,
      date: {
        [Op.gt]: firstDay,
        [Op.lt]: lastDay,
      },
    },
    include: [
      {
        model: db.missions,
      },
    ],
  });
  return (answers = new Array(7).fill({}).map((_, index) => {
    return (
      ExistAnswers.find(
        element =>
          element.date ===
          moment(today)
            .add(first, 'days')
            .add(index + 1, 'days')
            .format('YYYY-MM-DD'),
      ) || {}
    );
  }));
};

const getMonthDate = queryDate => {
  const date = !!queryDate ? moment(queryDate).date(1) : moment().date(1);
  const day = date.day();
  let first = -7;
  let last = 1;
  if (day != 0) {
    first = day * -1;
    last = 8 - day;
  }
  let firstDay = moment(date).add(first, 'days');
  let lastDay = moment(date).add(last, 'days');
  const weeks = [];
  while (lastDay.month() === date.month()) {
    firstDay = moment(firstDay).add(7, 'days');
    lastDay = moment(lastDay).add(7, 'days');
    weeks.push([firstDay.format('YYYY-MM-DD'), lastDay.format('YYYY-MM-DD')]);
  }
  return { weeks, date };
};

const getMonthAnswers = ({ weeks, userId }) => {
  return Promise.all(
    weeks.map(([firstDay, lastDay]) => {
      return db.answers.findAll({
        where: {
          userId,
          date: {
            [Op.gt]: firstDay,
            [Op.lt]: lastDay,
          },
        },
        include: [
          {
            model: db.missions,
          },
        ],
      });
    }),
  );
};
