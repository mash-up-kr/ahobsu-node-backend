const express = require('express');
const jwt = require('jsonwebtoken');

const db = require('../models');

const router = express.Router();

router.post('/', async (req, res, next) => {
  const { snsId } = req.body;
  const users = await db.users.findOne({ where: { snsId } });
  if (!users) {
    return res.json({
      status: 404,
      message: '유저가 존재하지 않습니다.',
      data: null,
    });
  }
  try {
    const token = await jwt.sign(
      {
        users,
      },
      process.env.privateKey,
      { expiresIn: 60 * 60 },
    );
    res.json({
      staus: 200,
      message: '',
      data: {
        token,
      },
    });
  } catch (e) {
    console.log(3, e);
    return res.json({
      staus: 500,
      message: '문제가 있음...',
      data: {
        token,
      },
    });
  }
  res.json({
    staus: 500,
    message: '문제가 있음...',
    data: {
      token,
    },
  });
});

module.exports = router;
