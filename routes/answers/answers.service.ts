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
