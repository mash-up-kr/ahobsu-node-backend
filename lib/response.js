module.exports = ({ status = 200, messgae = '', data = null }) => {
  return {
    status,
    messgae,
    data,
  };
};
