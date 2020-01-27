const express = require('express');
const sequelize = require('sequelize');
const moment = require('moment');
const { Op } = require('sequelize');

const db = require('../models');
const checkToken = require('../middleware/checkToken');
const response = require('../lib/response');

const router = express.Router();

router.get('/refresh', checkToken, async (req, res, next) => {
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
    if (!user.refreshDate || user.refreshDate < date) {
      const oneYearAgo = moment()
        .add(-1, 'years')
        .format('YYYY-MM-DD');
      const sql1 = `SELECT * FROM answers  join missions on answers.missionId = missions.id  WHERE (answers.date > '${oneYearAgo}' AND answers.date < '${date}');`;
      const oneYearData = await db.sequelize.query(sql1, {
        type: sequelize.QueryTypes.SELECT,
      });
      const ids = [];
      oneYearData.forEach(a => {
        if (
          moment(a.date)
            .add(a.cycle, 'days')
            .format('YYYY-MM-DD') >= date
        ) {
          ids.push(`'${a.id}'`);
        }
      });
      const sql2 = `SELECT * from missions 
        ${ids.length > 0 ? `WHERE NOT missions.id IN (${ids.join(',')})` : ''}
        ORDER BY RAND() LIMIT 3`;
      const missions = await db.sequelize.query(sql2, {
        type: sequelize.QueryTypes.SELECT,
      });

      await db.users.update(
        { refreshDate: date, missions: JSON.stringify(date, missions) },
        {
          where: {
            id,
          },
        },
      );
      res.json(response({ data: { refresh: false, missions } }));
    } else {
      res.json(response({ status: 400, message: '갱신 횟수가 모자랍니다.' }));
    }
  } catch (e) {
    console.log(e);
    res.json(response({ status: 500, message: e.message }));
  }
});

router.get('/', checkToken, async (req, res, next) => {
  const { id } = req.user;
  try {
    const user = await db.users.findOne({
      where: {
        id,
      },
    });
    if (!user) {
      return res.json(response({ status: 400, message: '유저가 존재하지 없습니다.' }));
    }
    const date = moment().format('YYYY-MM-DD');
    // const notInId
    const { missions } = user;
    const oldMission = missions && JSON.parse(missions);
    const refresh = !user.refreshDate || (!!user.refreshDate && user.refreshDate < date);

    if (!oldMission || (!!oldMission && oldMission.missions.length < 1) || oldMission.date < date) {
      const oneYearAgo = moment()
        .add(-1, 'years')
        .format('YYYY-MM-DD');
      const sql1 = `SELECT * FROM answers  join missions on answers.missionId = missions.id  WHERE (answers.date > '${oneYearAgo}' AND answers.date < '${date}');`;
      const oneYearData = await db.sequelize.query(sql1, {
        type: sequelize.QueryTypes.SELECT,
      });
      const ids = [];
      oneYearData.forEach(a => {
        if (
          moment(a.date)
            .add(a.cycle, 'days')
            .format('YYYY-MM-DD') >= date
        ) {
          ids.push(`'${a.id}'`);
        }
      });
      const sql2 = `SELECT * from missions ${
        ids.length > 0 ? `WHERE NOT missions.id IN (${ids.join(',')})` : ''
      } ORDER BY RAND() LIMIT 3`;
      const missions = await db.sequelize.query(sql2, {
        type: sequelize.QueryTypes.SELECT,
      });

      await db.users.update(
        { mission: JSON.stringify({ date, missions }) },
        {
          where: {
            id,
          },
        },
      );
      res.json(response({ data: { refresh, missions } }));
    } else {
      res.json(response({ data: refresh, missions: oldMission.missions }));
    }
  } catch (e) {
    console.log(e);
    res.json(response({ status: 500, message: e.message }));
  }
});

router.post('/', checkToken, async (req, res, next) => {
  const { title, isContent, isImage, cycle } = req.body;
  if (!title || (!isContent && isContent !== false) || (!isImage && isImage !== false) || !cycle) {
    return res.json(response({ status: 412, message: '필수 파라이터가 없습니다.' }));
  }
  try {
    const missions = await db.missions.create({ title, isContent, isImage, cycle });
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
  const { title, isContent, isImage, cycle } = req.body;
  if (!title || (!isContent && isContent !== false) || (!isImage && isImage !== false) || !cycle) {
    return res.json(response({ status: 412, message: '필수 파라이터가 없습니다.' }));
  }
  try {
    const mission = await db.missions.findOne({ where: { id } });
    if (!mission) {
      return res.json(response({ status: 400, message: '유효하지 않은 mission id 입니다.' }));
    }
    await db.missions.update(
      { title: title, isContent: isContent, isImage: isImage, cycle },
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
    res.json(response({ status: 204, message: '문제를 삭제 했습니다.' }));
  } catch (e) {
    console.log(e);
    res.json(response({ status: 500, message: e.message }));
  }
});

router.get('/:id', checkToken, async (req, res, next) => {
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
    res.json(response({ data: mission }));
  } catch (e) {
    console.log(e);
    res.json(response({ status: 500, message: e.message }));
  }
});

module.exports = router;
