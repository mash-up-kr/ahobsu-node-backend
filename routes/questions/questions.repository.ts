import db from '../../models';
import { integer } from 'aws-sdk/clients/cloudfront';

export const createQuestion = async ({ content }: { content: string }) => {
  return db.questions.create({
    content,
  });
};
export const getQuestions = async ({ page }: { page: string }) => {
  const pageNum = parseInt(page); // 요청 페이지 넘버
  let offset = 0;
  let limit = 5;

  if (pageNum > 1) {
    offset = limit * (pageNum - 1);
  }

  return db.questions.findAll({
    // pagination
    offset,
    limit,
  });
};
