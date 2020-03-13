import db from '../../models';

export const createQuestion = async ({ content }: { content: string }) => {
  return db.questions.create({
    content,
  });
};
export const getQuestionCount = async () => {
  return (await db.questions.findAll()).length;
};

export const getQuestions = async ({ page = '1', limit = '20' }: { page: string; limit: string }) => {
  // 요청 페이지 넘버
  const pageNum = parseInt(page, 10);
  // 요청 data 갯수
  const num = parseInt(limit, 10);
  let offset = 0;
  if (pageNum > 1) {
    offset = num * (pageNum - 1);
  }
  return db.questions.findAll({
    offset,
    limit: num,
  });
};
