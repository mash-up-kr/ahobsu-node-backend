// import jwt from 'jsonwebtoken';
import jwt from 'jsonwebtoken';
import response from '../lib/response';
import { RequestResponseNext } from '../routes';
import User from '../models/user';

const checkToken: RequestResponseNext = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(400).json(
      response({
        status: 400,
        message: '토큰이 필요합니다.',
      }),
    );
  }
  try {
    console.log('token', token);
    const result = (await jwt.verify(token, process.env.privateKey as string)) as {
      user: {
        id: number;
      };
    };
    if (typeof result === 'object' && !('user' in result)) {
      return res.status(400).json(
        response({
          status: 1100,
          message: '올바르지 못한 토큰 입니다.',
        }),
      );
    }
    if (!result.user.id) {
      return res.json(response({ status: 400, message: '유저 아이디가 존재하지 않습니다. 토큰을 확인해 주세요.' }));
    }
    req.user = result.user; // as User;
    next();
  } catch (e) {
    console.log(e);
    return res.status(500).json(
      response({
        status: 1100,
        message: '올바르지 못한 토큰 입니다.',
      }),
    );
  }
};

export default checkToken;
