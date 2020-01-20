const express = require('express');

const db = require('../models');
const checkToken = require('../middleware/checkToken');
const response = require('../lib/response');
const moment = require('moment');

const router = express.Router();

router.get('/my', checkToken, async (req, res, next) => {
  const { id } = req.user;
  try {
    const user = await db.users.findOne({ where: { id } });
    if (!user) {
      return res.json(response({ status: 404, message: '유저가 존재하지 없습니다.' }));
    }
    res.json(response({ data: user }));
  } catch (e) {
    console.log(e);
    return res.json(response({ status: 500, message: e.message }));
  }
});

router.get('/', checkToken, async (req, res, next) => {
  console.log(33, moment().format('YYYY-MM-DD HH:mm'));
  try {
    const users = await db.users.findAll();
    res.json(response({ data: users }));
  } catch (e) {
    console.log(e);
    return res.json(response({ status: 500, message: e.message }));
  }
});

router.post('/', async (req, res, next) => {
  const { name, birthday, email, gender, snsId, snsType, token } = req.body;
  if (!name || !birthday || !email || !gender || !snsId || !snsType || !token) {
    return res.json(response({ status: 412, message: '필수 파라이터가 없습니다.' }));
  }
  try {
    const user = await db.users.create({ name, birthday, email, gender, snsId, snsType });
    res.json(response({ data: user }));
  } catch (e) {
    console.log(e);
    res.json(response({ status: 500, message: e.message }));
  }
});

router.put('/', checkToken, async (req, res, next) => {
  const { id } = req.user;
  const { email, birthday } = req.body;
  if (isNaN(id)) {
    return res.json(response({ status: 412, message: 'id가 올바르지 않습니다.' }));
  }
  if (!email || !birthday) {
    return res.json(response({ status: 412, message: '필수 파라이터가 없습니다.' }));
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
    res.json(response({ status: 500, message: e.message }));
  }
});

router.delete('/', checkToken, async (req, res, next) => {
  const { id } = req.user;
  if (isNaN(id)) {
    return res.json(response({ status: 412, message: 'id가 올바르지 않습니다.' }));
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
    res.json(response({ message: '유저를 삭제 했습니다.' }));
  } catch (e) {
    console.log(e);
    res.json(response({ status: 500, message: e.message }));
  }
});

router.get('/:id', checkToken, async (req, res, next) => {
  const { id } = req.params.id;
  if (isNaN(id)) {
    return res.json(response({ status: 412, message: 'id가 올바르지 않습니다.' }));
  }
  try {
    const user = await db.users.findOne({ where: { id } });
    if (!user) {
      return res.json(response({ status: 404, message: '유저가 존재하지 없습니다.' }));
    }
    res.json(response({ data: user }));
  } catch (e) {
    console.log(e);
    return res.json(response({ status: 500, message: e.message }));
  }
});

module.exports = router;
