const request = require('supertest');

const app = require('../app');
const connectDB = require('../connectDB');

beforeAll(async () => {
  await connectDB();
});

describe('Test /api/v1/signin', () => {
  it('should return ok', async () => {
    const response = await request(app)
      .post('/api/v1/signin')
      .send({ snsId: '1', snsType: 'apple', token: 'aaa' });
    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe(200);
    expect(hasPostApiV1SigninRefreshKeys(response.body.data));
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
    expect(hasPostApiV1SigninRefreshKeys(response.body.data));
  });
});

function hasPostApiV1SigninRefreshKeys(data) {
  if (!('accessToken' in data)) throw new Error('missing accessToken key');
  if (!('refreshToken' in data)) throw new Error('missing refreshToken key');
  if (!('signUp' in data)) throw new Error('missing signUp key');
}
