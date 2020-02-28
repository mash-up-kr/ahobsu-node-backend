import { RequestResponseNext } from '..';
import { getUserById } from './users.repository';
import response from '../../lib/response';

export const checkUser: RequestResponseNext = async (req, res, next) => {
  const userId = req.user!.id;
  const user = await getUserById(userId);
  if (!user) {
    return res.json(response({ status: 400, message: '유저가 존재하지 없습니다.' }));
  }
  next();
};
