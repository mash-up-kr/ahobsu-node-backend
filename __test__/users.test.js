// tests/status.test.js
const request = require('supertest');
const app = require('../app');

describe('Test /api/v1/users', () => {
  test('should return ok', async () => {
    const response = await request(app).get('/api/v1/users');
    expect(response.statusCode).toBe(200);
  });
});
