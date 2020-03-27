import { getDateString } from '../../lib/date';
import Answer from '../../models/answer';

export const isRequiredoneOfThem = ({ imageUrl, content }: { imageUrl: string; content: string }) => {
  return !imageUrl && !content;
};

export const hasSixParsAndNotToday = (answers: Answer[]) => {
  return answers.length === 6 && answers[5] && answers[5].date !== getDateString({});
};

export const hasSetDate = (answer: Answer) => {
  return !!answer && !!answer.setDate;
};

export const getSetDate = (answers: Answer[]) => {
  if (answers.length === 6 || answers.length === 0) {
    return getDateString({});
  } else {
    return answers[0].setDate;
  }
};

export const getNo = (answers: Answer[]): number => {
  if (answers.length === 0) {
    return 1;
  } else if (answers.length === 6) {
    return answers[0].no! + 1;
  }
  return answers[0].no!;
};

export const getPartNumber = (answers: Answer[]) => {
  return answers.length >= 6 ? 1 : answers.length + 1;
};
