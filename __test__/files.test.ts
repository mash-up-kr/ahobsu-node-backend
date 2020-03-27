import path from 'path';
import request, { Response } from 'supertest';
import app from '../app';
import connectDB from '../connectDB';
import { signin } from './signin.test';
import { checkStatus, Request } from './util';
import File from '../models/file';

const file = path.join(__dirname, '../public/bigSizeimg.jpeg');
const req = request(app);
let token = '';

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
  let response: Response;
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
  });
});

export const hasFileKeys = (data: File) => {
  if (!('id' in data)) throw new Error('missing id key');
  if (!('cardUrl' in data)) throw new Error('missing cardUrl key');
  if (!('part' in data)) throw new Error('missing part key');
};

export const postFile = async ({
  req,
  token,
  file,
  part,
}: {
  req: Request;
  token: string;
  file: string;
  part: number;
}) => {
  return req
    .post('/api/v1/files')
    .set('Authorization', token)
    .field('part', part)
    .attach('file', file);
};

const deleteFileById = async ({ req, token, id }: { req: Request; token: string; id: number }) => {
  return req.delete(`/api/v1/files/${id}`).set('Authorization', token);
};

const putFile = async ({
  req,
  token,
  id,
  file,
  part,
}: {
  req: Request;
  token: string;
  id: number;
  file: string;
  part: number;
}) => {
  return req
    .put(`/api/v1/files/${id}`)
    .set('Authorization', token)
    .field('part', part)
    .attach('file', file);
};
