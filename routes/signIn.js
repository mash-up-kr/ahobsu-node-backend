const express = require('express');
const jwt = require('jsonwebtoken');

const db = require('../models');
const response = require('../lib/response');

const router = express.Router();

router.post('/refresh', async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.json(
      response({
        status: 400,
        message: '토큰이 필요합니다.',
      }),
    );
  }
  try {
    const result = jwt.verify(token, process.env.privateKey);
    if (!result.snsId) {
      return res.json(
        response({
          status: 500,
          message: '올바르지 못한 토큰 입니다.',
        }),
      );
    }
    const { snsId } = result;
    const user = await db.users.findOne({ where: { snsId } });
    if (!user) {
      return res.json(
        response({
          status: 404,
          message: '유저가 존재하지 않습니다.',
        }),
      );
    }
    const accessToken = await jwt.sign(
      {
        user,
      },
      process.env.privateKey,
      { expiresIn: 7 * 24 * 60 * 60 },
    );
    const refreshToken = await jwt.sign(
      {
        snsId,
      },
      process.env.privateKey,
      { expiresIn: 30 * 24 * 60 * 60 },
    );
    res.json(
      response({
        data: {
          accessToken,
          refreshToken,
        },
      }),
    );
  } catch (e) {
    console.log(e);
    return res.json(
      response({
        status: 400,
        message: '올바르지 못한 토큰 입니다.',
      }),
    );
  }
});

router.post('/', async (req, res, next) => {
  const { snsId } = req.body;
  if (!snsId) {
    return res.json(response({ status: 412, message: '필수 파라이터가 없습니다.' }));
  }
  console.log(333);
  try {
    const user = await db.users.findOne({ where: { snsId } });
    console.log(888, user);
    if (!user) {
      return res.json(
        response({
          status: 404,
          message: '유저가 존재하지 않습니다.',
        }),
      );
    }
    const accessToken = await jwt.sign(
      {
        user,
      },
      process.env.privateKey,
      { expiresIn: 7 * 24 * 60 * 60 },
    );
    const refreshToken = await jwt.sign(
      {
        snsId,
      },
      process.env.privateKey,
      { expiresIn: 30 * 24 * 60 * 60 },
    );
    res.json(
      response({
        data: {
          accessToken,
          refreshToken,
        },
      }),
    );
  } catch (e) {
    return res.json(
      response({
        staus: 500,
        message: e.message,
      }),
    );
  }
});

module.exports = router;
