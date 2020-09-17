import { RequestResponseNext } from '..';
import { getDateString, getMonthDate, getNow } from '../../lib/date';
import response from '../../lib/response';
import Answer from '../../models/answer';
import { getFileByPart } from '../files/files.repository';
import { Op } from 'sequelize';
import { getMissionById } from '../missions/missions.repository';
import {
  createAnswer,
  deleteAnswer,
  getAnswerByDateAnduserId,
  getAnswerByIdAnduserId,
  getAnswerByuserId,
  getMonthAnswers,
  getRecentAnswers,
  updateAnswer,
} from './answers.repository';
import { getNo, getPartNumber, getSetDate, hasSetDate, hasSixParsAndNotToday } from './answers.service';
import File from '../../models/file';
import db from '../../models';

const week: RequestResponseNext = async (req, res, next) => {
  try {
    const userId = req.user!.id;
    const answers = await getAnswerByuserId({ userId });
    const recentAnswers: Answer[] =
      answers && answers.setDate ? await getRecentAnswers({ userId, setDate: answers.setDate }) : [];
    {
      // 6개의 파츠를 모두 모은 날이 오늘이 아니면 새로운 것을 준다
      const answers = !!recentAnswers && !hasSixParsAndNotToday(recentAnswers) ? recentAnswers : [];
      const today = getDateString({});
      res.json(response({ data: { today, answers } }));
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json(response({ status: 500, message: error.message }));
  }
};

const month: RequestResponseNext = async (req, res, next) => {
  try {
    const { date } = req.query;
    const now = getNow(date);
    const { firstDate, lastDate } = getMonthDate(now);
    const userId = req.user!.id;
    const notGorupAnswers = await getMonthAnswers({ firstDate, lastDate, userId });
    const answers = notGorupAnswers.reduce(
      (acc: any, it: Answer) => ({ ...acc, [it.setDate!]: [...(acc[it.setDate!] || []), it] }),
      {},
    );
    const monthAnswer = Object.values(answers);
    res.json(response({ data: { date: firstDate, monthAnswer } }));
  } catch (error) {
    console.log(error.message);
    res.status(500).json(response({ status: 500, message: error.message }));
  }
};

const list: RequestResponseNext = async (req, res, next) => {
  try {
    const userId = req.user!.id;
    let { answerId } = req.query;
    let answer;
    let answers = [];
    for(let i = 0; i < 4; i++) {
      if(answerId) {
        answer = await db.Answer.findOne({
          where: {
            userId,
            id: {
              [Op.lt]: answerId,
            },
          },
          order: [['id', 'DESC']],
        })
      } else {
        answer = await db.Answer.findOne({
          where: {
            userId,
          },
          order: [['id', 'DESC']],
        })
      }
      if(!answer) {
        break;
      }
      answers[i] = await db.Answer.findAll({
        where: {
          userId,
          setDate: answer.setDate,
        },
        order: [['id', 'DESC']],
        include: [{ all: true }],
      })
      answerId = answers[i][answers[i].length -1].id
    }
    
    
    res.json(response({ data: answers }));
  } catch (error) {
    console.log(error.message);
    res.status(500).json(response({ status: 500, message: error.message }));
  }
  
}

const listId: RequestResponseNext = async (req, res, next) => {
  try {
    const userId = req.user!.id;
    const id = parseInt(req.params.id, 10);
      const answer = await db.Answer.findOne({
          where: {
            userId,
            id,
          },
          order: [['id', 'DESC']],
        })
      if(!answer || !answer.setDate) {
        res.json(response({ data: [] }));
      }
      const answers = await db.Answer.findAll({
        where: {
          userId,
          setDate: answer!.setDate,
        },
        order: [['id', 'DESC']],
        include: [{ all: true }],
      })
    res.json(response({ data: answers }));
  } catch (error) {
    console.log(error.message);
    res.status(500).json(response({ status: 500, message: error.message }));
  }
}

const date: RequestResponseNext = async (req, res, next) => {
  const userId = req.user!.id;
  const { date } = req.query;
  const answer = date ? await getAnswerByDateAnduserId({ userId, date }) : await getAnswerByuserId({ userId });
  res.json(response({ data: answer }));
};

const get: RequestResponseNext = async (req, res, next) => {
  const userId = req.user!.id;
  const id = parseInt(req.params.id, 10);
  const answer = await getAnswerByIdAnduserId({ id, userId });
  res.json(response({ data: answer }));
};

const create: RequestResponseNext = async (req, res, next) => {
  try {
    const userId = req.user!.id;
    const lastAnswer = await getAnswerByuserId({ userId });
    // 데이터가 있어야 무언가를 할수가...
    const recentAnswers: Answer[] = hasSetDate(lastAnswer!)
      ? await getRecentAnswers({ userId, setDate: lastAnswer?.setDate as string })
      : [];
    // 6개의 파츠를 모두 모았다면 새로운 파츠를 시작한다.
    const setDate = getSetDate(recentAnswers);
    const no = getNo(recentAnswers);
    const partNumber = getPartNumber(recentAnswers);
    const cardFile = await getFileByPart(partNumber);
    const { id: fileId = 1 } = (cardFile as unknown) as File;
    const { content, missionId, file: imageUrl } = req.body;
    const mission = await getMissionById(missionId);
    if (!!mission?.isImage && !imageUrl) {
      return res.status(400).json(response({ status: 400, message: 'file이 필요한 미션 입니다.' }));
    }
    if (!!mission?.isContent && !content) {
      return res.status(400).json(response({ status: 400, message: 'content가 필요한 미션 입니다.' }));
    }
    const date = getDateString({});
    const { id } = await createAnswer({ userId, missionId, imageUrl, fileId, content, date, setDate, no });
    {
      const answer = await getAnswerByIdAnduserId({ id, userId });
      return res.status(201).json(response({ status: 201, data: answer }));
    }
  } catch (e) {
    console.log(e);
    return res.status(500).json(response({ status: 500, message: e.message }));
  }
};

const update: RequestResponseNext = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    const userId = req.user!.id;
    const { file } = req.body;
    const answer = await getAnswerByIdAnduserId({ id, userId });
    const imageUrl = file ? file : answer?.imageUrl;
    const { content, missionId } = req.body;
    if (!!answer?.mission?.isImage && !imageUrl) {
      return res.status(400).json(response({ status: 400, message: 'file이 필요한 미션 입니다.' }));
    }
    if (!!answer?.mission?.isContent && !content) {
      return res.status(400).json(response({ status: 400, message: 'content가 필요한 미션 입니다.' }));
    }
    await updateAnswer({ id, userId, missionId, imageUrl, content });
    {
      const answer = await getAnswerByIdAnduserId({ id, userId });
      return res.json(response({ data: answer }));
    }
  } catch (e) {
    console.log(e);
    return res.status(500).json(response({ status: 500, message: e.message }));
  }
};

const destroy: RequestResponseNext = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    await deleteAnswer(id);
    res.status(204).json(response({ status: 204, message: '답변을 삭제 했습니다.' }));
  } catch (e) {
    console.log(e);
    return res.status(500).json(response({ status: 500, message: e.message }));
  }
};

export default {
  week,
  month,
  date,
  get,
  list,
  listId,
  create,
  update,
  destroy,
};
