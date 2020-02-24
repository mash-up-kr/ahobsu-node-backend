import moment = require('moment');

export const getDateString = (date?: string) => {
  return !!date ? moment(date).format('YYYY-MM-DD') : moment().format('YYYY-MM-DD');
};

export const getFirstDate = (now: Date) => {
  return moment(new Date(now.getFullYear(), now.getMonth(), 1)).format('YYYY-MM-DD');
};

export const getLastDate = (now: Date) => {
  return moment(new Date(now.getFullYear(), now.getMonth() + 1, 0)).format('YYYY-MM-DD');
};

export const getNow = (date: string | null) => {
  return !!date ? new Date(date) : new Date();
};

export const getMonthDate = (now: Date) => {
  const firstDate = getFirstDate(now);
  const lastDate = getLastDate(now);
  return { firstDate, lastDate };
};
