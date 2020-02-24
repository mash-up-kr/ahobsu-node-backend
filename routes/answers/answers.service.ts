import moment from 'moment';
import { Answers } from '../../models/answer';
import { getDateString } from '../../lib/date';

export const getMonthDate = (queryDate: string | null) => {
  const now = !!queryDate ? new Date(queryDate) : new Date();
  const firstDay = moment(new Date(now.getFullYear(), now.getMonth(), 1)).format('YYYY-MM-DD');
  const lastDay = moment(new Date(now.getFullYear(), now.getMonth() + 1, 0)).format('YYYY-MM-DD');
  return { firstDay, lastDay };
};

export const isRequiredoneOfThem = ({ imageUrl, content }: { imageUrl: string; content: string }) => {
  return !imageUrl && !content;
};

export const hasSixParsAndNotToday = (answers: Answers[]) => {
  return answers.length === 6 && answers[5] && answers[5].date !== getDateString();
};

export const hasSetDate = (answer: Answers) => {
  return !!answer && !!answer.setDate;
};

export const getSetDate = (answers: Answers[]) => {
  if (answers.length === 6 || answers.length === 0) {
    return getDateString();
  } else {
    return answers[0].setDate;
  }
};

export const getPartNumber = (answers: Answers[]) => {
  return answers.length >= 6 ? 1 : answers.length + 1;
};
