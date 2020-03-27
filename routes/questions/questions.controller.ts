import { RequestResponseNext } from '..';
import response from '../../lib/response';
import { isRequired, changeTypeToNumber, getOffset } from './questions.service';
import { createQuestion } from './questions.repository';
import { getQuestions } from './questions.repository';
import { getQuestionCount } from './questions.repository';

const get: RequestResponseNext = async (req, res) => {
  try {
    const { page: pageString, limit: limitString } = req.query;
    const { page, limit } = changeTypeToNumber({ pageString, limitString });
    const offset = getOffset({ page, limit });
    const questions = await getQuestions({ offset, limit });
    const questionTotalCount = await getQuestionCount();
    res.json(response({ data: { questionTotalCount, questions } }));
  } catch (e) {
    console.log(e);
    res.status(500).json(response({ status: 500, message: e.message }));
  }
};

const post: RequestResponseNext = async (req, res) => {
  try {
    if (isRequired(req.body)) {
      return res.json(response({ status: 412, message: '필수 파라이터가 없습니다.' }));
    }
    const question = await createQuestion(req.body);
    res.status(201).json(response({ status: 201, data: question }));
  } catch (e) {
    console.log(e);
    res.status(500).json(response({ status: 500, message: e.message }));
  }
};

export default { get, post };
