// tests/status.test.js
const request = require('supertest');
const app = require('../app');

let token = null;
let response = null;

beforeAll(async () => {
  const {
    body: {
      data: { accessToken },
    },
  } = await request(app)
    .post('/api/v1/signin')
    .send({ snsId: '2', snsType: 'apple' });
  token = accessToken;
});

describe('Test /api/v1/users', () => {
  test('should return ok', async () => {
    const response = await request(app).get('/api/v1/users');
    expect(response.statusCode).toBe(200);
  });
});

describe('users', () => {
  it('Put /api/v1/users', async () => {
    response = await request(app)
      .put(`/api/v1/users`)
      .set('Authorization', token)
      .send({ name: '김유정', birthday: '1997-01-16', email: 'yuchochpie@gmail.com', gender: '여' });
    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe(200);
    expect(hasUserKeys(response.body.data));
  });

  it('Get /api/v1/users', async () => {
    response = await request(app)
      .get(`/api/v1/users`)
      .set('Authorization', token);
    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe(200);
    expect(hasUserKeys(response.body.data[0]));
  });

  it('Get /api/v1/users/my', async () => {
    response = await request(app)
      .get(`/api/v1/users/my`)
      .set('Authorization', token);
    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe(200);
    expect(hasUserKeys(response.body.data));
  });

  it('Get /api/v1/users/{id}', async () => {
    response = await request(app)
      .get(`/api/v1/users/${response.body.data.id}`)
      .set('Authorization', token);
    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe(200);
    expect(hasUserKeys(response.body.data));
  });

  it('Delete /api/v1/users', async () => {
    response = await request(app)
      .delete(`/api/v1/users`)
      .set('Authorization', token);
    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe(200);
    expect(response.body.message).toBe('유저를 삭제 했습니다.');
  });
});

function hasUserKeys(data) {
  if (!('id' in data)) throw new Error('missing id key');
  if (!('birthday' in data)) throw new Error('missing birthday key');
  if (!('email' in data)) throw new Error('missing email key');
  if (!('name' in data)) throw new Error('missing name key');
  if (!('gender' in data)) throw new Error('missing gender key');
  if (!('snsId' in data)) throw new Error('missing snsId key');
  if (!('snsType' in data)) throw new Error('missing snsType key');
}
