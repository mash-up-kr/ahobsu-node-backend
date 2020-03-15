import db from '../../models';

export const createQuestion = async ({ content }: { content: string }) => {
  return db.questions.create({
    content,
  });
};
export const getQuestionCount = async () => {
  const questions = await db.questions.findAll();
  return questions.length;
};

export const getQuestions = ({ offset, limit = 20 }: { offset: number; limit: number }) => {
  return db.questions.findAll({
    offset,
    limit,
  });
};
