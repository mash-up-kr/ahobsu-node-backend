// tests/status.test.js
const request = require('supertest');
const app = require('../app');

describe('Test /signin', () => {
  test('should return ok', async () => {
    const response = await request(app)
      .post('/signin')
      .send({ snsId: 1 });
    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe(200);
  });
});

describe('Test /signin/refresh', () => {
  test('should return ok', async () => {
    const response = await request(app)
      .post('/signin/refresh')
      .set(
        'Authorization',
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzbnNJZCI6MSwiaWF0IjoxNTc5MDQ5MjkxLCJleHAiOjE1ODE2NDEyOTF9.pTR8rpi6YA204utBiKIu7Z5jfr6wRyVmfmkrbFyRfE4',
      );
    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe(200);
  });
});
