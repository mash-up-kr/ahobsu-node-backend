import moment = require('moment');

export const getDateString = (date?: string) => {
  return !!date ? moment(date).format('YYYY-MM-DD') : moment().format('YYYY-MM-DD');
};
