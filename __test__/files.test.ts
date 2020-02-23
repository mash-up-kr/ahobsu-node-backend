import * as path from 'path';
import * as request from 'supertest';
import app from '../app';
import connectDB from '../connectDB';
import { signin } from './signin.test';
import { checkStatus } from './util';

const file = path.join(__dirname, '../public/bigSizeimg.jpeg');
const req = request(app);
let token = null;

beforeAll(async () => {
  await connectDB();

  const {
    body: {
      data: { accessToken },
    },
  } = await signin(req);
  token = accessToken;
});

describe('files', () => {
  let response = null;
  const part = 1;
  it('Post /api/v1/files', async () => {
    const part = 1;
    response = await postFile({ req, token, part, file });
    checkStatus(response, 201);
    expect(hasFileKeys(response.body.data));
    expect(response.body.data.part).toBe(part);
  });

  it('Put /api/v1/files/{id}', async () => {
    const { id } = response.body.data;
    const part = 2;
    response = await putFile({ req, token, id, file, part });
    checkStatus(response);
    expect(hasFileKeys(response.body.data));
  });

  it('Delete /api/v1/files/{id}', async () => {
    const { id } = response.body.data;
    response = await deleteFileById({ req, token, id });
    checkStatus(response, 204);
    expect(response.body.message).toBe('파일을 삭제 했습니다.');
  });
});

const hasFileKeys = data => {
  if (!('id' in data)) throw new Error('missing id key');
  if (!('cardUrl' in data)) throw new Error('missing cardUrl key');
  if (!('part' in data)) throw new Error('missing part key');
};

export const postFile = async ({ req, token, file, part }) => {
  return req
    .post('/api/v1/files')
    .set('Authorization', token)
    .field('part', part)
    .attach('file', file);
};

const deleteFileById = async ({ req, token, id }) => {
  return req.delete(`/api/v1/files/${id}`).set('Authorization', token);
};

const putFile = async ({ req, token, id, file, part }) => {
  return req
    .put(`/api/v1/files/${id}`)
    .set('Authorization', token)
    .field('part', part)
    .attach('file', file);
};
