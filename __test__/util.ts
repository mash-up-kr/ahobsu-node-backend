import request, { Response } from 'supertest';

export const checkStatus = (response: Response, code = 200) => {
  expect(response.status).toBe(200);
  expect(response.body.status).toBe(code);
};

export type Request = request.SuperTest<request.Test>;
