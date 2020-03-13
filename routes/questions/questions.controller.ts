import { RequestResponseNext } from '..';
import response from '../../lib/response';
import { isRequired } from './questions.service';
import { createQuestion } from './questions.repository';
import { getQuestions } from './questions.repository';
import { getQuestionCount } from './questions.repository';

const get: RequestResponseNext = async (req, res) => {
  try {
    const { page, limit } = req.query;
    const questionTotalCount = await getQuestionCount();
    const questions = await getQuestions({ page, limit });
    res.json(response({ data: { questionTotalCount, questions } }));
  } catch (e) {
    console.log(e);
    res.json(response({ status: 500, message: e.message }));
  }
};

const post: RequestResponseNext = async (req, res) => {
  try {
    if (isRequired(req.body)) {
      return res.json(response({ status: 412, message: '필수 파라이터가 없습니다.' }));
    }
    const question = await createQuestion(req.body);
    res.json(response({ status: 201, data: question }));
  } catch (e) {
    console.log(e);
    res.json(response({ status: 500, message: e.message }));
  }
};

export default { get, post };
