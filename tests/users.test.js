// tests/status.test.js
const request = require('supertest');
const app = require('../app');

describe('Test /users', () => {
  test('should return ok', async () => {
    const response = await request(app).get('/users');
    console.log(111, response.statusCode);
    expect(response.statusCode).toBe(200);
  });
});
