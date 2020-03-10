import db from '../../models';

export const createQuestion = async ({ content }: { content: string }) => {
  return db.questions.create({
    content,
  });
};
export const getQuestionSum = async () => {
  const sum = (await db.questions.findAll()).length;
  return {
    sum,
  };
};

export const getQuestions = async ({ page = '1', listCount = '20' }: { page: string; listCount: string }) => {
  const pageNum = parseInt(page, 10); // 요청 페이지 넘버
  const limit = parseInt(listCount, 10); // 요청 data 갯수
  let offset = 0;
  if (pageNum > 1) {
    offset = limit * (pageNum - 1);
  }
  const questions = await db.questions.findAll({
    offset,
    limit,
  });
  return {
    questions,
  };
};
