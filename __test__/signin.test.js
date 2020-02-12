const request = require('supertest');

const app = require('../app');
const connectDB = require('../connectDB');

const req = request(app);

beforeAll(async () => {
  await connectDB();
});

describe('signin', () => {
  it('Post /api/v1/signin', async () => {
    const token = 'aa';
    const response = await request(app)
      .post('/api/v1/signin')
      .set('Authorization', token)
      .send({ snsType: 'apple' });
    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe(201);
    expect(hasPostApiV1SigninRefreshKeys(response.body.data));
  });
});

describe('signin refresh', () => {
  it('Post /api/v1/signin/refresh', async () => {
    const {
      body: {
        data: { refreshToken },
      },
    } = await request(app)
      .post('/api/v1/signin')
      .send({ snsType: 'apple' });
    const response = await request(app)
      .post('/api/v1/signin/refresh')
      .set('Authorization', refreshToken);
    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe(201);
    expect(hasPostApiV1SigninRefreshKeys(response.body.data));
  });
});

function hasPostApiV1SigninRefreshKeys(data) {
  if (!('accessToken' in data)) throw new Error('missing accessToken key');
  if (!('refreshToken' in data)) throw new Error('missing refreshToken key');
  if (!('signUp' in data)) throw new Error('missing signUp key');
}

const signin = async req => {
  const snsType = 'apple';
  const token = 'aaa';
  return req
    .post('/api/v1/signin')
    .set('Authorization', token)
    .send({ snsType });
};

module.exports = { signin };
