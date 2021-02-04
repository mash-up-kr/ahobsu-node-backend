import { RequestResponseNext } from '..';
import { getDateString } from '../../lib/date';
import response from '../../lib/response';
import { getMissionById } from '../missions/missions.repository';
import { getAnswerByDateAnduserId, getAnswerByIdAnduserId } from './answers.repository';
import { isRequiredoneOfThem } from './answers.service';

export const checkRequiredoneOfThem: RequestResponseNext = async (req, res, next) => {
  const { file: imageUrl, content } = req.body;
  console.log('412' ,imageUrl, content)
  if (isRequiredoneOfThem({ imageUrl, content })) {
    return res.status(412).json(response({ status: 412, message: '필수 파라미터가 부족합니다.' }));
  }
  next();
};

export const existAnswerByDateAnduserId: RequestResponseNext = async (req, res, next) => {
  const userId = req.user!.id;
  const date = getDateString({});
  const answer = await getAnswerByDateAnduserId({ userId, date });
  if (!!answer) {
    return res.status(400).json(response({ status: 400, message: '해당날짜에 답변이 존재합니다.' }));
  }
  next();
};

export const checkmissionId: RequestResponseNext = async (req, res, next) => {
  const { missionId } = req.body;
  const checkMission = await getMissionById(missionId);
  if (!checkMission) {
    return res.json(response({ status: 412, message: 'missionId가 존재하지 않습니다.' }));
  }
  next();
};

export const existAnswerByIdAnduserId: RequestResponseNext = async (req, res, next) => {
  const id = parseInt(req.params.id, 10);
  const userId = req.user!.id;
  const answer = await getAnswerByIdAnduserId({ id, userId });
  if (!answer) {
    return res.json(response({ status: 404, message: '존재하지않는 answerId.' }));
  }
  next();
};
