// tests/status.test.js
const request = require('supertest');
const app = require('../app');

describe('Test /status', () => {
  it('should return ok', done => {
    request(app)
      .get('/status')
      .then(response => {
        expect(response.text).toBe('ok');
        done();
      });
  });
});
