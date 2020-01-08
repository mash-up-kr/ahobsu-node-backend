const express = require('express');
const sequelize = require('sequelize');
const moment = require('moment');

const db = require('../models');
const checkToken = require('../middleware/checkToken');
const response = require('../lib/response');

const router = express.Router();

router.post('/refresh', checkToken, async (req, res, next) => {
  const { id } = req.user;
  try {
    const user = await db.users.findOne({
      where: {
        id,
      },
    });
    if (!user) {
      return res.json(response({ status: 404, message: '유저가 존재하지 없습니다.' }));
    }
    const date = await moment().format('YYYY-MM-DD');
    if (!user.refreshDate && user.refreshDate < date) {
      const sql = 'SELECT * from chocopie.missions ORDER BY RAND() LIMIT 3';
      const mission = await db.sequelize.query(sql, {
        type: sequelize.QueryTypes.SELECT,
      });
      await db.users.update(
        { refreshDate: date, mission: JSON.stringify(date, mission) },
        {
          where: {
            id,
          },
        },
      );
      res.json(response({ data: mission }));
    } else {
      res.json(response({ status: 400, message: '갱신 횟수가 모자랄 수 있습니다.' }));
    }
  } catch (e) {
    console.log(e);
    res.json(response({ status: 500, message: e.message }));
  }
});

router.get('/', checkToken, async (req, res, next) => {
  const { id } = req.user;
  const user = await db.users.findOne({
    where: {
      id,
    },
  });
  if (!user) {
    return res.json(response({ status: 404, message: '유저가 존재하지 없습니다.' }));
  }
  const date = moment().format('YYYY-MM-DD');
  const { mission } = user;
  const oldMission = JSON.parse(mission);
  if (!oldMission || oldMission.date < date) {
    const sql = 'SELECT * from chocopie.missions ORDER BY RAND() LIMIT 3';
    const mission = await db.sequelize.query(sql, {
      type: sequelize.QueryTypes.SELECT,
    });

    await db.users.update(
      { mission: JSON.stringify({ date, mission }) },
      {
        where: {
          id,
        },
      },
    );
    res.json(response({ data: mission }));
  } else {
    res.json(response({ data: oldMission.mission }));
  }
});

router.post('/', checkToken, async (req, res, next) => {
  const { title, isContent, isImage } = req.body;
  if (!title || (!isContent && isContent !== false) || (!isImage && isImage !== false)) {
    return res.json(response({ status: 412, message: '필수 파라이터가 없습니다.' }));
  }
  try {
    const missions = await db.missions.create({ title, isContent, isImage });
    res.json(response({ status: 201, data: missions }));
  } catch (e) {
    console.log(e);
    res.json(response({ status: 500, message: e.message }));
  }
});

router.put('/:id', checkToken, async (req, res, next) => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) {
    return res.json(response({ status: 412, message: 'id가 올바르지 않습니다.' }));
  }
  const { title, isContent, isImage } = req.body;
  if (!title || (!isContent && isContent !== false) || (!isImage && isImage !== false)) {
    return res.json(response({ status: 412, message: '필수 파라이터가 없습니다.' }));
  }
  try {
    const mission = await db.missions.findOne({ where: { id } });
    if (!mission) {
      return res.json(response({ status: 400, message: '유효하지 않은 mission id 입니다.' }));
    }
    await db.missions.update(
      { title: title, isContent: isContent, isImage: isImage },
      {
        where: {
          id,
        },
      },
    );
    const newMission = await db.missions.findOne({ where: { id } });
    res.json(response({ data: newMission }));
  } catch (e) {
    console.log(e);
    res.json(response({ status: 500, message: e.message }));
  }
});

router.delete('/:id', checkToken, async (req, res, next) => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) {
    return res.json(response({ status: 412, message: 'id가 올바르지 않습니다.' }));
  }
  try {
    const mission = await db.missions.findOne({
      where: {
        id,
      },
    });
    if (!mission) {
      return res.json({ message: '유효하지 않은 mission id 입니다.' });
    }
    await db.missions.destroy({
      where: {
        id,
      },
    });
    res.json(response({ message: '문제를 삭제 했습니다.' }));
  } catch (e) {
    console.log(e);
    res.json(response({ status: 500, message: e.message }));
  }
});

module.exports = router;
