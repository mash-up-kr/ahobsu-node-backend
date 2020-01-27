const request = require('supertest');
const path = require('path');

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
    .send({ snsId: '1', snsTpye: 'apple' });
  token = accessToken;
});

describe('files', () => {
  const date = '2020-01-23';
  const file = path.join(__dirname, '/money.jpg');
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
    expect(response.body.status).toBe(200);
    expect(hasFileKeys);
  });

  it('Get /api/v1/files/{id}', async () => {
    response = await request(app)
      .get(`/api/v1/files/${date}`)
      .set('Authorization', token);
    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe(200);
    expect(hasFileKeys);
  });

  it('Put /api/v1/files/{id}', async () => {
    response = await request(app)
      .put(`/api/v1/files/${response.body.data.id}`)
      .set('Authorization', token)
      .attach('file', file);
    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe(200);
    expect(hasFileKeys);
  });

  it('Delete /api/v1/files/{id}', async () => {
    response = await request(app)
      .delete(`/api/v1/files/${response.body.data.id}`)
      .set('Authorization', token);
    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe(200);
  });
});

function hasFileKeys(res) {
  if (!('id' in res.body)) throw new Error('missing id key');
  if (!('cardUrl' in res.body)) throw new Error('missing cardUrl key');
  if (!('date' in res.body)) throw new Error('missing date key');
}

describe('files2', () => {
  it('Get /api/v1/files/week', async () => {
    response = await request(app)
      .get('/api/v1/files/week')
      .set('Authorization', token);
    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe(200);
  });
});
