const checkStatus = (response, code = 200) => {
  expect(response.statusCode).toBe(200);
  expect(response.body.status).toBe(code);
};
module.exports = { checkStatus };
