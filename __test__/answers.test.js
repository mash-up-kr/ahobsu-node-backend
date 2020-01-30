const request = require('supertest');
const path = require('path');
const moment = require('moment');

const app = require('../app');
const connectDB = require('../connectDB');

let token = null;
let response = null;
const date = moment().format('YYYY-MM-DD');
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

describe('answers', () => {
  let missionId = null;
  it('Post /api/v1/answers', async () => {
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

    const title = '안녕';
    const isContent = true;
    const isImage = false;
    const cycle = 1;
    const content = 'aaa';
    response = await request(app)
      .post('/api/v1/missions')
      .set('Authorization', token)
      .send({ title, isContent, isImage, cycle });
    missionId = response.body.data.id;
    response = await request(app)
      .post('/api/v1/answers')
      .set('Authorization', token)
      .field('missionId', missionId)
      .field('content', content)
      .attach('file', file);
    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe(201);
    expect(hasAnswerKeys(response.body.data));
    expect(response.body.data.content).toBe(content);
    expect(response.body.data.missionId).toBe(String(missionId));
  });

  it('Post /api/v1/answers Exist', async () => {
    const existResponse = await request(app)
      .post('/api/v1/answers')
      .set('Authorization', token)
      .field('missionId', missionId)
      .field('content', 'aaa')
      .attach('file', file);
    expect(existResponse.statusCode).toBe(200);
    expect(existResponse.body.status).toBe(400);
    expect(existResponse.body.message).toBe('해당날짜에 답변이 존재합니다.');
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
    const content = 'bbb';
    response = await request(app)
      .put(`/api/v1/answers/${response.body.data.id}`)
      .set('Authorization', token)
      .field('content', content)
      .attach('file', file);
    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe(200);
    expect(hasAnswerKeys(response.body.data));
    expect(response.body.data.content).toBe(content);
  });

  it('Get /api/v1/answers/week', async () => {
    const response = await request(app)
      .get('/api/v1/answers/week')
      .set('Authorization', token);
    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe(200);
    expect(response.body.data.today).toBeTruthy();
    expect(response.body.data.answers.length > 0).toBeTruthy();

    // expect(hasAnswerKeys(response.body.data.answers[0]));
  });

  it('Get /api/v1/answers/month', async () => {
    const today = moment();
    const week = today.weeks() - 2;
    const response = await request(app)
      .get('/api/v1/answers/month')
      .set('Authorization', token);
    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe(200);
    expect(response.body.data.answers.length > 0).toBeTruthy();
    expect(response.body.data.date).toBe(`${today.format('YYYY-MM')}-01`);
    expect(hasAnswerKeys(response.body.data.answers[week][0]));
  });

  it('Get /api/v1/answers/month?date={date}', async () => {
    const month = moment().add(-1, 'months');
    const date = month.format('YYYY-MM-DD');

    const haveDateResponse = await request(app)
      .get(`/api/v1/answers/month?date=${date}`)
      .set('Authorization', token);
    expect(haveDateResponse.statusCode).toBe(200);
    expect(haveDateResponse.body.status).toBe(200);
    expect(haveDateResponse.body.data.answers.length > 0).toBeTruthy();
    expect(haveDateResponse.body.data.date).toBe(`${month.format('YYYY-MM')}-01`);
  });

  it('Delete /api/v1/answers/{id}', async () => {
    response = await request(app)
      .delete(`/api/v1/answers/${response.body.data.id}`)
      .set('Authorization', token);
    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe(204);
    expect(response.body.message).toBe('답변을 삭제 했습니다.');
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
