const express = require('express');
const jwt = require('jsonwebtoken');

const db = require('../../models');
const response = require('../../lib/response');

const refresh = async (req, res, next) => {
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
    if (!result.snsId && !result.snsType) {
      return res.json(
        response({
          status: 500,
          message: '올바르지 못한 토큰 입니다.',
        }),
      );
    }
    const { snsId, snsType } = result;
    const user = await db.users.findOne({ where: { snsId, snsType } });
    if (!user) {
      return res.json(response({ status: 404, message: '유저가 존재하지 없습니다.' }));
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
        snsType,
      },
      process.env.privateKey,
      { expiresIn: 30 * 24 * 60 * 60 },
    );
    const signUp = !!user.name && !!user.birthday && !!user.email && !!user.gender;
    res.json(
      response({
        data: {
          accessToken,
          refreshToken,
          signUp,
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
};

const create = async (req, res, next) => {
  const token = req.headers.authorization;
  const { snsId, snsType } = req.body;
  if (!snsId || !snsType) {
    return res.json(response({ status: 412, message: '필수 파라이터가 없습니다.' }));
  }
  try {
    const user = await db.users.findOne({ where: { snsId, snsType } });
    const newUser = user ? user : await db.users.create({ snsId, snsType });
    const accessToken = await jwt.sign(
      {
        user: newUser,
      },
      process.env.privateKey,
      { expiresIn: 7 * 24 * 60 * 60 },
    );
    const refreshToken = await jwt.sign(
      {
        snsId,
        snsType,
      },
      process.env.privateKey,
      { expiresIn: 30 * 24 * 60 * 60 },
    );
    const signUp = !!newUser.name && !!newUser.birthday && !!newUser.email && !!newUser.gender;
    res.json(
      response({
        data: {
          accessToken,
          refreshToken,
          signUp,
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
};

module.exports = { refresh, create };
