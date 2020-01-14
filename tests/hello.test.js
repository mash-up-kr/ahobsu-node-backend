// tests/hello.test.js
const request = require('supertest');
const app = require('../app');

describe('Test /hello', () => {
  it('should return world!', done => {
    request(app)
      .get('/hello')
      .then(response => {
        expect(response.text).toBe('world!');
        done();
      });
  });
});
