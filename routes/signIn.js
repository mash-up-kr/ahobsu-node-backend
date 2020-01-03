const express = require('express');
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

  res.json({ users });
});
