// tests/status.test.js
const request = require('supertest');

import app from '../app';
import connectDB from '../connectDB';
const { checkStatus } = require('./util');
const { signin } = require('./signin.test');

let token = null;
const req = request(app);

beforeAll(async () => {
  await connectDB();

  const {
    body: {
      data: { accessToken },
    },
  } = await signin(req);
  token = accessToken;
});

describe('users', () => {
  let response = null;
  it('Put /api/v1/users', async () => {
    const name = '김유정';
    const birthday = '1997-01-16';
    const gender = '여';
    response = await putUser({ req, token, name, birthday, gender });
    checkStatus(response);
    expect(hasUserKeys(response.body.data));
    expect(response.body.data.name).toBe(name);
    expect(response.body.data.birthday).toBe(birthday);
    expect(response.body.data.gender).toBe(gender);
  });

  it('Get /api/v1/users', async () => {
    response = await getUsers({ req, token });
    checkStatus(response);
    expect(hasUserKeys(response.body.data[0]));
  });

  it('Get /api/v1/users/my', async () => {
    response = await getUserByToken({ req, token });
    checkStatus(response);
    expect(hasUserKeys(response.body.data));
  });

  it('Get /api/v1/users/{id}', async () => {
    const { id } = response.body.data;
    response = await getUser({ req, token, id });
    checkStatus(response);
    expect(hasUserKeys(response.body.data));
  });

  it('Delete /api/v1/users', async () => {
    response = await deleteUser({ req, token });
    checkStatus(response);
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

const putUserRefresh = async ({ req, token }) => {
  return req.put(`/api/v1/users/refresh`).set('Authorization', token);
};
module.exports = { putUserRefresh, hasUserKeys };

const putUser = async ({ req, token, name, birthday, gender }) => {
  return req
    .put(`/api/v1/users`)
    .set('Authorization', token)
    .send({ name, birthday, gender });
};

const getUsers = async ({ req, token }) => {
  return req.get(`/api/v1/users`).set('Authorization', token);
};

const getUserByToken = async ({ req, token }) => {
  return req.get(`/api/v1/users/my`).set('Authorization', token);
};

const getUser = async ({ req, token, id }) => {
  return req.get(`/api/v1/users/${id}`).set('Authorization', token);
};

const deleteUser = async ({ req, token }) => {
  return req.delete(`/api/v1/users`).set('Authorization', token);
};
