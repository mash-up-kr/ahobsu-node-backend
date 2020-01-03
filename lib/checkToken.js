const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
  const token = req.headers.authorization;
  console.log({ token });
  try {
    req.user = jwt.verify(token, process.env.privateKey);
  } catch (e) {
    console.log(e);
    return res.json({
      status: 500,
      messgae: '올바르지 못한 토큰 입니다.',
      data: null,
    });
  }
  next();
};
