import { RequestResponseNext } from '..';
import response from '../../lib/response';
import { getUserById } from './users.repository';
import { isRequired } from './users.service';

export const checkUser: RequestResponseNext = async (req, res, next) => {
  const userId = req.user!.id;
  const user = await getUserById(userId);
  if (!user) {
    return res.status(400).json(response({ status: 400, message: '유저가 존재하지 없습니다.' }));
  }
  next();
};

export const checkBody: RequestResponseNext = async (req, res, next) => {
  if (isRequired(req.body)) {
    return res.status(412).json(response({ status: 412, message: '필수 파라이터가 없습니다.' }));
  }
  next();
};
