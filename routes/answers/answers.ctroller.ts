import { RequestResponseNext } from '..';
import { getDateString, getMonthDate, getNow } from '../../lib/date';
import response from '../../lib/response';
import { Answers } from '../../models/answer';
import { getFileByPart } from '../files/files.repository';
import {
  createAnswer,
  deleteAnswer,
  getAnswerByDateAndUserId,
  getAnswerByIdAndUserId,
  getAnswerByUserId,
  getMonthAnswers,
  getRecentAnswers,
  updateAnswer,
} from './answers.repository';
import { getPartNumber, getSetDate, hasSetDate, hasSixParsAndNotToday } from './answers.service';
import { getMissionById } from '../missions/missions.repository';

const week: RequestResponseNext = async (req, res, next) => {
  try {
    const userId = req.user!.id;
    const answers = await getAnswerByUserId({ userId });
    // 여기있는 let도 지우고 싶다...
    const recentAnswers: Answers[] =
      answers && answers.setDate ? await getRecentAnswers({ userId, setDate: answers.setDate }) : [];
    {
      // 6개의 파츠를 모두 모은 날이 오늘이 아니면 새로운 것을 준다
      const answers = !!recentAnswers && !hasSixParsAndNotToday(recentAnswers) ? recentAnswers : [];
      const today = getDateString({});
      res.json(response({ data: { today, answers } }));
    }
  } catch (error) {
    console.log(error.message);
    res.json(response({ status: 500, message: error.message }));
  }
};

const month: RequestResponseNext = async (req, res, next) => {
  try {
    const { date: queryDate } = req.query;
    const now = getNow(queryDate);
    const { firstDate, lastDate } = getMonthDate(now);
    const userId = req.user!.id;
    const notGorupAnswers = await getMonthAnswers({ firstDate, lastDate, userId });
    const answers = notGorupAnswers.reduce(
      (acc: any, it: Answers) => ({ ...acc, [it.setDate!]: [...(acc[it.setDate!] || []), it] }),
      {},
    );
    const monthAnswer = Object.values(answers);
    res.json(response({ data: { date: firstDate, monthAnswer } }));
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

const get: RequestResponseNext = async (req, res, next) => {
  const userId = req.user!.id;
  const id = parseInt(req.params.id, 10);
  const answer = await getAnswerByIdAndUserId({ id, userId });
  res.json(response({ data: answer }));
};

const create: RequestResponseNext = async (req, res, next) => {
  try {
    const userId = req.user!.id;
    const lastAnswer = await getAnswerByUserId({ userId });
    // 데이터가 있어야 무언가를 할수가...
    const recentAnswers: Answers[] = hasSetDate(lastAnswer)
      ? await getRecentAnswers({ userId, setDate: lastAnswer.setDate as string })
      : [];
    // 6개의 파츠를 모두 모았다면 새로운 파츠를 시작한다.
    const setDate = getSetDate(recentAnswers);
    const partNumber = getPartNumber(recentAnswers);
    const cardFile = await getFileByPart(partNumber);
    const { id: fileId } = cardFile;
    const { content, missionId, file: imageUrl } = req.body;
    const mission = await getMissionById(missionId);
    if (!!mission.isImage && !imageUrl) {
      return res.json(response({ status: 400, message: 'file이 필요한 미션 입니다.' }));
    }
    if (!!mission.isContent && !content) {
      return res.json(response({ status: 400, message: 'content가 필요한 미션 입니다.' }));
    }
    const date = getDateString({});
    const { id } = await createAnswer({ userId, missionId, imageUrl, fileId, content, date, setDate });
    {
      const answer = await getAnswerByIdAndUserId({ id, userId });
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
    const userId = req.user!.id;
    const { file } = req.body;
    const answer = await getAnswerByIdAndUserId({ id, userId });
    const imageUrl = file ? file : answer.imageUrl;
    const { content, missionId } = req.body;
    if (!!answer.mission.isImage && !imageUrl) {
      return res.json(response({ status: 400, message: 'file이 필요한 미션 입니다.' }));
    }
    if (!!answer.mission.isContent && !content) {
      return res.json(response({ status: 400, message: 'content가 필요한 미션 입니다.' }));
    }
    await updateAnswer({ id, userId, missionId, imageUrl, content });
    {
      const answer = await getAnswerByIdAndUserId({ id, userId });
      return res.json(response({ data: answer }));
    }
  } catch (e) {
    console.log(e);
    console.log(1111, e.message);
    return res.json(response({ status: 500, message: e.message }));
  }
};

const destroy: RequestResponseNext = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
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
  get,
  create,
  update,
  destroy,
};
