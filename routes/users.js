const express = require('express');

const db = require('../models');
const checkToken = require('../lib/checkToken');
const response = require('../lib/response');

const router = express.Router();

router.get('/', async (req, res, next) => {
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

router.delete('/:id', async (req, res, next) => {
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

module.exports = router;
