import db from '../../models';

export const createQuestion = async ({ content }: { content: string }) => {
  return db.questions.create({
    content,
  });
};
export const getQuestions = async ({ page, listCount }: { page: string; listCount: string }) => {
  const pageNum = parseInt(page, 10); // 요청 페이지 넘버
  const limit = parseInt(listCount, 10); // 요청 data 갯수
  let offset = 0;
  if (pageNum > 1) {
    offset = limit * (pageNum - 1);
  }
  const sum = (await db.questions.findAll()).length;
  const questions = await db.questions.findAll({
    offset,
    limit,
  });
  return {
    sum,
    questions,
  };
};
