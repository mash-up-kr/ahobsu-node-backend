import { RequestResponseNext } from '..';
import response from '../../lib/response';
import { getMissionById } from './missions.repository';
import { isRequired } from './missions.service';

export const checkBody: RequestResponseNext = (req, res, next) => {
  if (isRequired(req.body)) {
    return res.status(412).json(response({ status: 412, message: '필수 파라이터가 없습니다.' }));
  }
  next();
};

export const checkMission: RequestResponseNext = async (req, res, next) => {
  const id = parseInt(req.params.id, 10);
  const mission = await getMissionById(id);
  if (!mission) {
    return res.status(400).json(response({ status: 400, message: '유효하지 않은 mission id 입니다.' }));
  }
  next();
};
