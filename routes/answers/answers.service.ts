import { getDateString } from '../../lib/date';
import { Answers } from '../../models/answer';

export const isRequiredoneOfThem = ({ imageUrl, content }: { imageUrl: string; content: string }) => {
  return !imageUrl && !content;
};

export const hasSixParsAndNotToday = (answers: Answers[]) => {
  return answers.length === 6 && answers[5] && answers[5].date !== getDateString({});
};

export const hasSetDate = (answer: Answers) => {
  return !!answer && !!answer.setDate;
};

export const getSetDate = (answers: Answers[]) => {
  if (answers.length === 6 || answers.length === 0) {
    return getDateString({});
  } else {
    return answers[0].setDate;
  }
};

export const getNo = (answers: Answers[]): number => {
  if (answers.length === 0) {
    return 1;
  } else if (answers.length === 6) {
    return answers[0].no! + 1;
  }
  return answers[0].no!;
};

export const getPartNumber = (answers: Answers[]) => {
  return answers.length >= 6 ? 1 : answers.length + 1;
};
