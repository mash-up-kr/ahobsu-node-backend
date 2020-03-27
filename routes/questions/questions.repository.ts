import db from '../../models';

export const createQuestion = async ({ content }: { content: string }) => {
  return db.Question.create({
    content,
  });
};
export const getQuestionCount = async () => {
  const questions = await db.Question.findAll();
  return questions.length;
};

export const getQuestions = ({ offset, limit = 20 }: { offset: number; limit: number }) => {
  return db.Question.findAll({
    offset,
    limit,
  });
};
