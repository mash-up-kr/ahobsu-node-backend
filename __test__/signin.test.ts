import request from 'supertest';
import app from '../app';
import connectDB from '../connectDB';
import { checkStatus, Request } from './util';

const req = request(app);

beforeAll(async () => {
  await connectDB();
});

describe('signin', () => {
  it('Post /api/v1/signin', async () => {
    const response = await signin(req);
    checkStatus(response, 201);
    expect(hasPostApiV1SigninRefreshKeys(response.body.data));
  });
});

describe('signin refresh', () => {
  it('Post /api/v1/signin/refresh', async () => {
    const {
      body: {
        data: { refreshToken },
      },
    } = await signin(req);
    const response = await checkRefreshToken({ req, refreshToken });
    checkStatus(response, 201);
    expect(hasPostApiV1SigninRefreshKeys(response.body.data));
  });
});

const hasPostApiV1SigninRefreshKeys = (data: { accessToken: string; refreshToken: string; signUp: boolean }) => {
  if (!('accessToken' in data)) throw new Error('missing accessToken key');
  if (!('refreshToken' in data)) throw new Error('missing refreshToken key');
  if (!('signUp' in data)) throw new Error('missing signUp key');
};

export const signin = async (req: Request) => {
  const snsType = 'apple';
  const token = 'aaa';
  return req
    .post('/api/v1/signin')
    .set('Authorization', token)
    .send({ snsType });
};

const checkRefreshToken = async ({ req, refreshToken }: { req: Request; refreshToken: string }) => {
  return req.post('/api/v1/signin/refresh').set('Authorization', refreshToken);
};
