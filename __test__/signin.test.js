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
    expect(response.body.data.accessToken).toBeTruthy();
    expect(response.body.data.refreshToken).toBeTruthy();
  });
});

describe('Test /signin/refresh', () => {
  test('should return ok', async () => {
    const {
      body: {
        data: { refreshToken },
      },
    } = await request(app)
      .post('/signin')
      .send({ snsId: 1 });
    const response = await request(app)
      .post('/signin/refresh')
      .set('Authorization', refreshToken);
    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe(200);
    expect(response.body.data.accessToken).toBeTruthy();
    expect(response.body.data.refreshToken).toBeTruthy();
  });
});
