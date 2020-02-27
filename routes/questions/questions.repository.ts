import db from '../../models';

export const createQuestion = async ({ content }: { content: string }) => {
  return db.questions.create({
    content,
  });
};
export const getQuestions = async () => {
  return db.questions.findAll();
};
