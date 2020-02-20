const request = require('supertest');
const path = require('path');

import app from '../app';
import connectDB from '../connectDB';
const { checkStatus } = require('./util');
const { signin } = require('./signin.test');

const date = '2020-01-23';
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
  it('Post /api/v1/files', async () => {
    response = await getFileByDate({ req, token, date });
    checkStatus(response);

    if (response.body.data) {
      const { id } = response.body.data;
      response = await deleteFileById({ req, token, id });
      checkStatus(response);
    }

    response = await postFile({ req, token, date, file });
    checkStatus(response, 201);
    expect(hasFileKeys(response.body.data));
    expect(response.body.data.date).toBe(date);
  });
  it('Post /api/v1/files Exist', async () => {
    const ExistResponse = await postFile({ req, token, date, file });
    checkStatus(ExistResponse, 400);
    expect(ExistResponse.body.message).toBe('해당날짜에 이미지가 이미 있습니다.');
  });

  it('Get /api/v1/files/{id}', async () => {
    response = await getFileByDate({ req, token, date });
    checkStatus(response);
    expect(hasFileKeys(response.body.data));
  });

  it('Put /api/v1/files/{id}', async () => {
    const { id } = response.body.data;
    response = await putFile({ req, token, id, file });
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

function hasFileKeys(data) {
  if (!('id' in data)) throw new Error('missing id key');
  if (!('cardUrl' in data)) throw new Error('missing cardUrl key');
  if (!('date' in data)) throw new Error('missing date key');
}

const postFile = async ({ req, token, file, date }) => {
  return req
    .post('/api/v1/files')
    .set('Authorization', token)
    .field('date', date)
    .attach('file', file);
};

module.exports = { postFile };

const getFileByDate = async ({ req, token, date }) => {
  return req.get(`/api/v1/files/${date}`).set('Authorization', token);
};

const deleteFileById = async ({ req, token, id }) => {
  return req.delete(`/api/v1/files/${id}`).set('Authorization', token);
};

const putFile = async ({ req, token, id, file }) => {
  return req
    .put(`/api/v1/files/${id}`)
    .set('Authorization', token)
    .attach('file', file);
};
