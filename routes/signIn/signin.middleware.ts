import { RequestResponseNext } from '..';
import response from '../../lib/response';
import { isRequired } from './signIn.service';

export const checkToken: RequestResponseNext = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.json(response({ status: 400, message: '토큰이 필요합니다.' }));
  }
  next();
};

export const checkBody: RequestResponseNext = (req, res, next) => {
  if (isRequired(req.body)) {
    return res.json(response({ status: 412, message: '필수 파라이터가 없습니다.' }));
  }
  next();
};
