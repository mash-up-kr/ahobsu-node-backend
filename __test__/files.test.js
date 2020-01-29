const request = require('supertest');
const path = require('path');

const app = require('../app');
const connectDB = require('../connectDB');

let token = null;
let response = null;
const date = '2020-01-23';
const file = path.join(__dirname, '/money.jpg');

beforeAll(async () => {
  await connectDB();

  const {
    body: {
      data: { accessToken },
    },
  } = await request(app)
    .post('/api/v1/signin')
    .send({ snsId: '1', snsType: 'apple' });
  token = accessToken;
});

describe('files', () => {
  it('Post /api/v1/files', async () => {
    response = await request(app)
      .get(`/api/v1/files/${date}`)
      .set('Authorization', token);
    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe(200);

    if (response.body.data) {
      response = await request(app)
        .delete(`/api/v1/files/${response.body.data.id}`)
        .set('Authorization', token);
      expect(response.statusCode).toBe(200);
      expect(response.body.status).toBe(200);
    }

    response = await request(app)
      .post('/api/v1/files')
      .set('Authorization', token)
      .field('date', date)
      .attach('file', file);
    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe(201);
    expect(hasFileKeys(response.body.data));
    expect(response.body.data.date).toBe(date);
  });
  it('Post /api/v1/files Exist', async () => {
    const ExistResponse = await request(app)
      .post('/api/v1/files')
      .set('Authorization', token)
      .field('date', date)
      .attach('file', file);
    expect(ExistResponse.statusCode).toBe(200);
    expect(ExistResponse.body.status).toBe(400);
    expect(ExistResponse.body.message).toBe('해당날짜에 이미지가 이미 있습니다.');
  });

  it('Get /api/v1/files/{id}', async () => {
    response = await request(app)
      .get(`/api/v1/files/${date}`)
      .set('Authorization', token);
    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe(200);
    expect(hasFileKeys(response.body.data));
  });

  it('Put /api/v1/files/{id}', async () => {
    response = await request(app)
      .put(`/api/v1/files/${response.body.data.id}`)
      .set('Authorization', token)
      .attach('file', file);
    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe(200);
    expect(hasFileKeys(response.body.data));
  });

  it('Delete /api/v1/files/{id}', async () => {
    response = await request(app)
      .delete(`/api/v1/files/${response.body.data.id}`)
      .set('Authorization', token);
    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe(204);
    expect(response.body.message).toBe('파일을 삭제 했습니다.');
  });
});

function hasFileKeys(data) {
  if (!('id' in data)) throw new Error('missing id key');
  if (!('cardUrl' in data)) throw new Error('missing cardUrl key');
  if (!('date' in data)) throw new Error('missing date key');
}

// describe('files2', () => {
//   it('Get /api/v1/files/week', async () => {
//     response = await request(app)
//       .get('/api/v1/files/week')
//       .set('Authorization', token);
//     expect(response.statusCode).toBe(200);
//     expect(response.body.status).toBe(200);
//   });
// });
