import { RequestResponseNext } from '..';
import { getDateString } from '../../lib/date';
import response from '../../lib/response';
import { getMissionById } from '../missions/missions.repository';
import { getAnswerByDateAndUserId, getAnswerByIdAndUserId } from './answers.repository';
import { isRequiredoneOfThem } from './answers.service';

export const checkRequiredoneOfThem: RequestResponseNext = async (req, res, next) => {
  const { file: imageUrl, content } = req.body;
  if (isRequiredoneOfThem({ imageUrl, content })) {
    return res.json(response({ status: 412, message: '필수 파라미터가 부족합니다.' }));
  }
  next();
};

export const existAnswerByDateAndUserId: RequestResponseNext = async (req, res, next) => {
  const userId = req.user!.id;
  const date = getDateString();
  const answer = await getAnswerByDateAndUserId({ userId, date });
  if (!!answer) {
    return res.json(response({ status: 400, message: '해당날짜에 답변이 존재합니다.' }));
  }
  next();
};

export const checkMissionId: RequestResponseNext = async (req, res, next) => {
  const { missionId } = req.body;
  const checkMission = await getMissionById(missionId);
  if (!checkMission) {
    return res.json(response({ status: 412, message: 'missionId가 존재하지 않습니다.' }));
  }
  next();
};

export const existAnswerByIdAndUserId: RequestResponseNext = async (req, res, next) => {
  const id = parseInt(req.params.id, 10);
  const userId = req.user!.id;
  const answer = await getAnswerByIdAndUserId({ id, userId });
  if (!answer) {
    return res.json(response({ status: 404, message: '존재하지않는 answerId.' }));
  }
  next();
};
