import moment from 'moment';
import { RequestResponseNext } from '..';
import response from '../../lib/response';
import { getFileByPart } from '../files/files.repository';
import { getMissionById } from '../missions/missions.repository';
import {
  getRecentAnswers,
  getMonthAnswers,
  getAnswerByDateAndUserId,
  createAnswer,
  getAnswerById,
  updateAnswer,
  deleteAnswer,
  getAnswerByUserId,
} from './answers.repository';
import {
  getMonthDate,
  isRequiredoneOfThem,
  hasSixParsAndNotToday,
  hasSetDate,
  getSetDate,
  getPartNumber,
} from './answers.service';
import { getDateString } from '../../lib/date';
import { Answers } from '../../models/answer';

const week: RequestResponseNext = async (req, res, next) => {
  try {
    const userId = req.user!.id;
    const answers = await getAnswerByUserId({ userId });
    let recentAnswers: Answers[] = [];
    if (answers && answers.setDate) {
      recentAnswers = await getRecentAnswers({ userId, setDate: answers.setDate });
      if (!recentAnswers) recentAnswers = [];
    }
    // 6개의 파츠를 모두 모은 날이 오늘이 아니면 새로운 것을 준다
    if (hasSixParsAndNotToday(recentAnswers)) {
      recentAnswers = [];
    }
    const today = getDateString();
    res.json(response({ data: { today, answers: recentAnswers } }));
  } catch (error) {
    console.log(error.message);
    res.json(response({ status: 500, message: error.message }));
  }
};
const month: RequestResponseNext = async (req, res, next) => {
  try {
    const userId = req.user!.id;
    const { date: queryDate } = req.query;
    const { firstDay, lastDay } = getMonthDate(queryDate);
    const answers = await getMonthAnswers({ firstDay, lastDay, userId });
    res.json(response({ data: { date: firstDay, answers } }));
  } catch (error) {
    console.log(error.message);
    res.json(response({ status: 500, message: error.message }));
  }
};

const date: RequestResponseNext = async (req, res, next) => {
  const userId = req.user!.id;
  const { date } = req.params;
  const answer = await getAnswerByDateAndUserId({ userId, date });
  res.json(response({ data: answer }));
};

const create: RequestResponseNext = async (req, res, next) => {
  try {
    const userId = req.user!.id;
    const date = getDateString();
    const { content, missionId, file: imageUrl } = req.body;

    if (isRequiredoneOfThem({ imageUrl, content })) {
      return res.json(response({ status: 412, message: '필수 파라미터가 부족합니다.' }));
    }

    const answer = await getAnswerByDateAndUserId({ userId, date });
    if (!!answer) {
      return res.json(response({ status: 400, message: '해당날짜에 답변이 존재합니다.' }));
    }

    const checkMission = await getMissionById(missionId);
    if (!checkMission) {
      return res.json(response({ status: 412, message: 'missionId가 존재하지 않습니다.' }));
    }

    const lastAnswer = await getAnswerByUserId({ userId });
    // 데이터가 있어야 무언가를 할수가...
    const recentAnswers: Answers[] = hasSetDate(lastAnswer)
      ? await getRecentAnswers({ userId, setDate: lastAnswer.setDate as string })
      : [];

    // 6개의 파츠를 모두 모았다면 새로운 파츠를 시작한다.
    const setDate = getSetDate(recentAnswers);
    const partNumber = getPartNumber(recentAnswers);
    let cardFile = await getFileByPart(partNumber);

    const { cardUrl } = cardFile;
    const { id } = await createAnswer({ userId, missionId, imageUrl, cardUrl, content, date, setDate });
    {
      const answer = await getAnswerById(id);
      return res.json(response({ status: 201, data: answer }));
    }
  } catch (e) {
    console.log(e);
    return res.json(response({ status: 500, message: e.message }));
  }
};
const update: RequestResponseNext = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    let userId = 0;
    if (req.user) {
      const { id } = req.user;
      userId = id;
    }
    const { content, missionId } = req.body;
    let { file: imageUrl } = req.body;

    if (isNaN(id)) {
      return res.json(response({ status: 412, message: 'id가 올바르지 않습니다.' }));
    }

    if (isRequiredoneOfThem({ imageUrl, content })) {
      return res.json(response({ status: 404, message: '필수 파라미터가 부족합니다.' }));
    }

    const answer = await getAnswerById(id);
    if (!answer) {
      return res.json(response({ status: 404, message: '존재하지않는 answerId.' }));
    }

    if (answer.userId !== userId) {
      return res.json(response({ status: 400, message: '본인의 답변만 수정 할 수 있습니다.' }));
    }

    if (!imageUrl) {
      imageUrl = answer.imageUrl;
    }
    await updateAnswer({ id, userId, missionId, imageUrl, content });
    {
      const answer = await getAnswerById(id);
      return res.json(response({ data: answer }));
    }
  } catch (e) {
    console.log(e);
    return res.json(response({ status: 500, message: e.message }));
  }
};
const destroy: RequestResponseNext = async (req, res, next) => {
  try {
    let userId = 0;
    if (req.user) {
      const { id } = req.user;
      userId = id;
    }

    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return res.json(response({ status: 412, message: 'id가 올바르지 않습니다.' }));
    }

    const answer = await getAnswerById(id);
    if (!answer) {
      return res.json(response({ status: 404, message: '유효하지 않은 answerId' }));
    }

    if (answer.userId !== userId) {
      return res.json(response({ status: 400, message: '본인의 답변만 삭제 할 수 있습니다.' }));
    }

    await deleteAnswer(id);
    res.json(response({ status: 204, message: '답변을 삭제 했습니다.' }));
  } catch (e) {
    console.log(e);
    return res.json(response({ status: 500, message: e.message }));
  }
};

export default {
  week,
  month,
  date,
  create,
  update,
  destroy,
};
