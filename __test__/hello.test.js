// tests/hello.test.js
const request = require('supertest');
const app = require('../app');

describe('Test /api/v1/hello', () => {
  it('should return world!', done => {
    request(app)
      .get('/api/v1/hello')
      .then(response => {
        expect(response.text).toBe('world!');
        done();
      });
  });
});

// request(app)
//   .post('/')
//   .field('name', 'my awesome avatar')
//   .attach('avatar', 'test/fixtures/avatar.jpg')
//   ...

// expect(users).toHaveLength(3);
// expect(users).toContainEqual({ id: 1, email: 'user1@test.com' });
// expect(data.users).not.toContainEqual(user);

// expect(user).toHaveProperty('id', 1);
