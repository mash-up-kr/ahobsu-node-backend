const jwt = require('jsonwebtoken');

const response = require('../lib/response');

module.exports = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.json(
      response({
        status: 400,
        messgae: '토큰이 필요합니다.',
      }),
    );
  }
  try {
    const result = await jwt.verify(token, process.env.privateKey);
    console.log(result);
    if (!result.user) {
      return res.json(
        response({
          status: 500,
          messgae: '올바르지 못한 토큰 입니다.',
        }),
      );
    }
    req.user = result.user;
    next();
  } catch (e) {
    console.log(e);
    return res.json(
      response({
        status: 500,
        messgae: '올바르지 못한 토큰 입니다.',
      }),
    );
  }
};
