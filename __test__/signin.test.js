const request = require('supertest');
const app = require('../app');

describe('Test /api/v1/signin', () => {
  it('should return ok', async () => {
    const response = await request(app)
      .post('/api/v1/signin')
      .send({ snsId: '1', snsType: 'apple', token: 'aaa' });
    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe(200);
    expect(response.body.data.accessToken).toBeTruthy();
    expect(response.body.data.refreshToken).toBeTruthy();
  });
});

describe('Test /api/v1/signin/refresh', () => {
  it('should return ok', async () => {
    const {
      body: {
        data: { refreshToken },
      },
    } = await request(app)
      .post('/api/v1/signin')
      .send({ snsId: '1', snsType: 'apple' });
    const response = await request(app)
      .post('/api/v1/signin/refresh')
      .set('Authorization', refreshToken);
    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe(200);
    expect(response.body.data.accessToken).toBeTruthy();
    expect(response.body.data.refreshToken).toBeTruthy();
    expect(hasPostApiV1SigninRefreshKeys);
  });
});

function hasPostApiV1SigninRefreshKeys(res) {
  if (!('accessToken' in res.body)) throw new Error('missing accessToken key');
  if (!('refreshToken' in res.body)) throw new Error('missing refreshToken key');
  if (!('signUp' in res.body)) throw new Error('missing signUp key');
}
