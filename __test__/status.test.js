// tests/status.test.js
const request = require('supertest');
const app = require('../app');

describe('Test /api/v1/status', () => {
  it('should return ok', done => {
    request(app)
      .get('/api/v1/status')
      .then(response => {
        expect(response.text).toBe('ok');
        done();
      });
  });
});
