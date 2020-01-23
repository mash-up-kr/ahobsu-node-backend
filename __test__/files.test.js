// tests/status.test.js
const request = require('supertest');
const path = require('path');

const app = require('../app');

let response = null;

beforeAll(async () => {
  const {
    body: {
      data: { accessToken },
    },
  } = await request(app)
    .post('/api/v1/signin')
    .send({ snsId: 1 });
  token = accessToken;
});

describe('files', () => {
  test('Get /api/v1/files/week', async () => {
    response = await request(app)
      .get('/api/v1/files/week')
      .set('Authorization', token);
    console.log(111, response.body);
    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe(200);
  });
});

describe('files2', () => {
  test('Get /api/v1/files/week', async () => {
    response = await request(app)
      .get('/api/v1/files/week')
      .set('Authorization', token);
    console.log(111, response.body);
    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe(200);
  });
});
