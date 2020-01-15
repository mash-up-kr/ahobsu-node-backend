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
