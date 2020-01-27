const request = require('supertest');
const path = require('path');
const moment = require('moment');

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
    .send({ snsId: '1', snsType: 'apple' });
  token = accessToken;
});

describe('answers', () => {
  it('Post /api/v1/answers', async () => {
    const date = moment().format('YYYY-MM-DD');
    const file = path.join(__dirname, '/money.jpg');

    response = await request(app)
      .get(`/api/v1/answers/${date}`)
      .set('Authorization', token);
    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe(200);

    if (response.body.data) {
      response = await request(app)
        .delete(`/api/v1/answers/${response.body.data.id}`)
        .set('Authorization', token);
      expect(response.statusCode).toBe(200);
      expect(response.body.status).toBe(200);
    }

    response = await request(app)
      .post('/api/v1/answers')
      .set('Authorization', token)
      .field('missionId', 1)
      .field('content', 'aaa')
      .attach('file', file);
    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe(200);
    expect(hasAnswerKeys(response.body.data));
  });

  it('Get /api/v1/answers/{date}', async () => {
    const date = moment().format('YYYY-MM-DD');

    response = await request(app)
      .get(`/api/v1/answers/${date}`)
      .set('Authorization', token);
    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe(200);
    expect(hasAnswerKeys(response.body.data));
  });

  it('Put /api/v1/answers/{id}', async () => {
    const file = path.join(__dirname, '/money.jpg');

    response = await request(app)
      .put(`/api/v1/answers/${response.body.data.id}`)
      .set('Authorization', token)
      .field('content', 'bbb')
      .attach('file', file);
    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe(200);
    expect(hasAnswerKeys(response.body.data));
  });

  it('Delete /api/v1/answers/{id}', async () => {
    response = await request(app)
      .delete(`/api/v1/answers/${response.body.data.id}`)
      .set('Authorization', token);
    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe(200);
  });
});

function hasAnswerKeys(data) {
  if (!('id' in data)) throw new Error('missing id key');
  if (!('userId' in data)) throw new Error('missing userId key');
  if (!('missionId' in data)) throw new Error('missing missionId key');
  if (!('imageUrl' in data)) throw new Error('missing imageUrl key');
  if (!('cardUrl' in data)) throw new Error('missing cardUrl key');
  if (!('content' in data)) throw new Error('missing content key');
  if (!('date' in data)) throw new Error('missing date key');
}

describe('answers2', () => {
  it('Get /api/v1/answers/week', async () => {
    const response = await request(app)
      .get('/api/v1/answers/week')
      .set('Authorization', token);
    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe(200);
  });
});

describe('answers3', () => {
  it('Get /api/v1/answers/month', async () => {
    const response = await request(app)
      .get('/api/v1/answers/month')
      .set('Authorization', token);
    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe(200);
  });

  it('Get /api/v1/answers/month?date={date}', async () => {
    const date = moment()
      .add(-1, 'months')
      .format('YYYY-MM-DD');

    const response2 = await request(app)
      .get(`/api/v1/answers/month?date=${date}`)
      .set('Authorization', token);
    expect(response2.statusCode).toBe(200);
    expect(response2.body.status).toBe(200);
  });
});
