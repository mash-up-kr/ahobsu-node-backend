const express = require('express');

const db = require('../models');
const checkToken = require('../lib/checkToken');
const response = require('../lib/response');

const router = express.Router();

router.get('/', checkToken, async (req, res, next) => {
  console.log(111, req.user);
  try {
    const users = await db.users.findAll();
    res.json(response({ data: users }));
  } catch (e) {
    console.log(e);
    return res.json(response({ status: 500, messgae: e.message }));
  }
});

router.post('/', async (req, res, next) => {
  const { name, birthday, email, gender, snsId, snsType } = req.body;
  if (!name || !birthday || !email || !gender || !snsId || !snsType) {
    return res.json(response({ status: 412, messgae: '필수 파라이터가 없습니다.' }));
  }
  try {
    const user = await db.users.create({ name, birthday, email, gender, snsId, snsType });
    res.json(response({ data: user }));
  } catch (e) {
    console.log(e);
    res.json(response({ status: 500, messgae: e.message }));
  }
});

router.put('/:id', checkToken, async (req, res, next) => {
  const id = parseInt(req.params.id, 10);
  const { email, birthday } = req.body;
  if (isNaN(id)) {
    return res.json(response({ status: 412, messgae: 'id가 올바르지 않습니다.' }));
  }
  if (!email || !birthday) {
    return res.json(response({ status: 412, messgae: '필수 파라이터가 없습니다.' }));
  }
  try {
    const user = await db.users.findOne({ where: { id } });
    if (!user) {
      return res.json(response({ status: 404, message: '유저가 존재하지 없습니다.' }));
    }
    await db.users.update(
      { email, birthday },
      {
        where: {
          id,
        },
      },
    );
    const newUser = await db.users.findOne({ where: { id } });
    res.json(response({ data: { user: newUser } }));
  } catch (e) {
    console.log(e);
    res.json(response({ status: 500, messgae: e.message }));
  }
});

router.delete('/:id', checkToken, async (req, res, next) => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) {
    return res.json(response({ status: 412, messgae: 'id가 올바르지 않습니다.' }));
  }
  try {
    const user = await db.users.findOne({
      where: {
        id,
      },
    });
    if (!user) {
      return res.json(response({ status: 404, message: '유저가 존재하지 없습니다.' }));
    }
    await db.users.destroy({
      where: {
        id,
      },
    });
    return res.json(response({ message: '유저를 삭제 했습니다.' }));
  } catch (e) {
    console.log(e);
    res.json(response({ status: 500, messgae: e.message }));
  }
});

router.post('/refresh', checkToken, async (req, res, next) => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) {
    return res.json(response({ status: 412, messgae: 'id가 올바르지 않습니다.' }));
  }
  try {
    const user = await db.users.findOne({
      where: {
        id,
      },
    });
    if (!user) {
      return res.json(response({ status: 404, message: '유저가 존재하지 없습니다.' }));
    }
    const date = await moment()
      .tz('Asia/Seoul')
      .format('YYYY-MM-DD');
    if (!user.refreshDate && user.refreshDate < date) {
      const { id } = req.user;
      await db.users.update(
        { refreshDate: date },
        {
          where: {
            id,
          },
        },
      );
      const sql = 'SELECT * from chocopie.missions ORDER BY RAND() LIMIT 3';
      const result = await db.sequelize.query(sql, {
        type: sequelize.QueryTypes.SELECT,
      });
      res.json(response({ data: result }));
    } else {
      res.json(response({ status: 400, messgae: '갱신 횟수가 모자랄 수 있습니다.' }));
    }
  } catch (e) {
    console.log(e);
    res.json(response({ status: 500, messgae: e.message }));
  }
});

module.exports = router;
