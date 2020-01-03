module.exports = ({ status = 200, message = '', data = null }) => {
  return {
    status,
    message,
    data,
  };
};
