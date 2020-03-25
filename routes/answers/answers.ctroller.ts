import { RequestResponseNext } from '..';
import { getDateString, getMonthDate, getNow } from '../../lib/date';
import response from '../../lib/response';
import Answer from '../../models/answer';
import { getFileByPart } from '../files/files.repository';
import { getMissionById } from '../missions/missions.repository';
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
import { getNo, getPartNumber, getSetDate, hasSetDate, hasSixParsAndNotToday } from './answers.service';

const week: RequestResponseNext = async (req, res, next) => {
  try {
    const UserId = req.user!.id;
    const answers = await getAnswerByUserId({ UserId });
    console.log(111, answers);
    const recentAnswers: Answer[] =
      answers && answers.setDate ? await getRecentAnswers({ UserId, setDate: answers.setDate }) : [];
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
    const { date } = req.query;
    const now = getNow(date);
    const { firstDate, lastDate } = getMonthDate(now);
    const UserId = req.user!.id;
    const notGorupAnswers = await getMonthAnswers({ firstDate, lastDate, UserId });
    const answers = notGorupAnswers.reduce(
      (acc: any, it: Answer) => ({ ...acc, [it.setDate!]: [...(acc[it.setDate!] || []), it] }),
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
  const UserId = req.user!.id;
  const { date } = req.query;
  const answer = date ? await getAnswerByDateAndUserId({ UserId, date }) : await getAnswerByUserId({ UserId });
  res.json(response({ data: answer }));
};

const get: RequestResponseNext = async (req, res, next) => {
  const UserId = req.user!.id;
  const id = parseInt(req.params.id, 10);
  const answer = await getAnswerByIdAndUserId({ id, UserId });
  res.json(response({ data: answer }));
};

const create: RequestResponseNext = async (req, res, next) => {
  try {
    const UserId = req.user!.id;
    const lastAnswer = await getAnswerByUserId({ UserId });
    // 데이터가 있어야 무언가를 할수가...
    const recentAnswers: Answer[] = hasSetDate(lastAnswer)
      ? await getRecentAnswers({ UserId, setDate: lastAnswer.setDate as string })
      : [];
    // 6개의 파츠를 모두 모았다면 새로운 파츠를 시작한다.
    const setDate = getSetDate(recentAnswers);
    const no = getNo(recentAnswers);
    const partNumber = getPartNumber(recentAnswers);
    const cardFile = await getFileByPart(partNumber);
    const { id: FileId } = cardFile;
    const { content, MissionId, file: imageUrl } = req.body;
    const mission = await getMissionById(MissionId);
    if (!!mission.isImage && !imageUrl) {
      return res.json(response({ status: 400, message: 'file이 필요한 미션 입니다.' }));
    }
    if (!!mission.isContent && !content) {
      return res.json(response({ status: 400, message: 'content가 필요한 미션 입니다.' }));
    }
    const date = getDateString({});
    const { id } = await createAnswer({ UserId, MissionId, imageUrl, FileId, content, date, setDate, no });
    {
      const answer = await getAnswerByIdAndUserId({ id, UserId });
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
    const UserId = req.user!.id;
    const { file } = req.body;
    const answer = await getAnswerByIdAndUserId({ id, UserId });
    const imageUrl = file ? file : answer.imageUrl;
    const { content, MissionId } = req.body;
    if (!!answer.mission?.isImage && !imageUrl) {
      return res.json(response({ status: 400, message: 'file이 필요한 미션 입니다.' }));
    }
    if (!!answer.mission?.isContent && !content) {
      return res.json(response({ status: 400, message: 'content가 필요한 미션 입니다.' }));
    }
    await updateAnswer({ id, UserId, MissionId, imageUrl, content });
    {
      const answer = await getAnswerByIdAndUserId({ id, UserId });
      return res.json(response({ data: answer }));
    }
  } catch (e) {
    console.log(e);
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
