const express = require('express');
const moment = require('moment');
const { Op } = require('sequelize');

const db = require('../models');

const router = express.Router();

/* GET users listing. */
router.get('/week/:date', async (req, res, next) => {
  // db에서 해당 날짜 데이터 조회!
  const { date } = req.params;
  console.log(123, date);
  const userId = 1;
  const firstDay = await moment(date).format('YYYY-MM-DD');
  const lastDay = await moment(date)
    .add(7, 'days')
    .format('YYYY-MM-DD');
  console.log(333, date);
  const answers = await db.answers.findAll({
    where: {
      userId,
      date: {
        [Op.gt]: new Date(firstDay),
        [Op.lt]: new Date(lastDay),
      },
    },
  });
  //   const answer = answers.findOne({ where: { createdAt } });

  //   console.log(1111, createdAt);
  //   console.log(123123, answers.createdAt);

  //   console.log(22222, moment(answers.createdAt).format('YYYY-MM-DD'));
  //   console.log(
  //     333,
  //     moment(answers.createdAt)
  //       .add('days', 1)
  //       .format('YYYY-MM-DD'),
  //   );

  //   console.log(
  //     444,
  //     moment(answers.createdAt)
  //       .add('days', 2)
  //       .format('YYYY-MM-DD'),
  //   );
  res.json({ answers });
});

router.get('/:date', async (req, res, next) => {
  const userId = 1;
  const answer = await db.answers.findAll({
    where: {
      userId,
      date: req.params.date,
    },
  });
  res.json({ answer });
});

router.post('/', async (req, res, next) => {
  const { userId, missionId, imageUrl, content } = req.body;
  const checkAnswer = await db.answers.findOne({ where: { missionId } });
  if (!!checkAnswer) {
    return res.json({ message: '문제에 대한 답변이 존재합니다.' });
  }
  const date = moment()
    .tz('Asia/Seoul')
    .format('YYYY-MM-DD');
  const answer = await db.answers.create({ userId, missionId, imageUrl, content, date });
  res.json({ answer });
});

router.put('/:id', async (req, res, next) => {
  const id = parseInt(req.params.id, 10);
  const { userId, missionId, imageUrl, content } = req.body;
  const answer = await db.answers.findOne({ where: { id } });
  console.log(111, answer);
  if (!!answer) {
    await db.answers.update(
      { userId: userId, missionId: missionId, imageUrl: imageUrl, content: content },
      {
        where: {
          id,
        },
      },
    );
    const newAnswer = await db.answers.findOne({ where: { id } });
    return res.json({ answer: newAnswer });
  }
  res.json({ message: '유효하지 않은 answerId' });
});

router.delete('/:id', async (req, res, next) => {
  const id = parseInt(req.params.id, 10);
  const answer = await db.answers.findOne({
    where: {
      id,
    },
  });
  if (!!answer) {
    const answers = await db.answers.destroy({
      where: {
        id,
      },
    });
    return res.json({ message: '답변을 삭제 했습니다.' });
  }
  res.json({ message: '유효하지 않은 answerId' });
});

module.exports = router;
