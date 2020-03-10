import db from '../../models';

export const createQuestion = async ({ content }: { content: string }) => {
  return db.questions.create({
    content,
  });
};
export const getQuestions = async ({ number }: { number: string }) => {
  const pageNum = parseInt(number, 10); // 요청 페이지 넘버
  let offset = 0;
  const limit = 5;
  const sum = (await db.questions.findAll()).length;
  const questions = await db.questions.findAll({
    offset,
    limit,
  });
  console.log(333);
  console.log(sum);

  if (pageNum > 1) {
    offset = limit * (pageNum - 1);
  }

  return {
    sum,
    questions,
  };
};
