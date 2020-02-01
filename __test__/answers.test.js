const request = require('supertest');
const path = require('path');
const moment = require('moment');

const app = require('../app');
const connectDB = require('../connectDB');
const { checkStatus } = require('./util');
const { hasMissionKeys } = require('./missions.test');

let token = null;

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
  let response = null;
  const file = path.join(__dirname, '/money.jpg');
  const date = moment().format('YYYY-MM-DD');
  let missionId = null;
  it('Post /api/v1/answers', async () => {
    response = await request(app)
      .get(`/api/v1/answers/${date}`)
      .set('Authorization', token);
    checkStatus(response);

    if (response.body.data) {
      response = await request(app)
        .delete(`/api/v1/answers/${response.body.data.id}`)
        .set('Authorization', token);
      checkStatus(response);
    }
    const ago = moment().format('1999-01-20');
    await Promise.all([
      // 1
      request(app)
        .post('/api/v1/files')
        .set('Authorization', token)
        .field('date', ago)
        .attach('file', file),
      // 2
      request(app)
        .post('/api/v1/files')
        .set('Authorization', token)
        .field('date', ago)
        .attach('file', file),
      // 3
      request(app)
        .post('/api/v1/files')
        .set('Authorization', token)
        .field('date', ago)
        .attach('file', file),
      // 4
      request(app)
        .post('/api/v1/files')
        .set('Authorization', token)
        .field('date', ago)
        .attach('file', file),
      // 5
      request(app)
        .post('/api/v1/files')
        .set('Authorization', token)
        .field('date', ago)
        .attach('file', file),
      // 6
      request(app)
        .post('/api/v1/files')
        .set('Authorization', token)
        .field('date', ago)
        .attach('file', file),
      // 7
      request(app)
        .post('/api/v1/files')
        .set('Authorization', token)
        .field('date', ago)
        .attach('file', file),
    ]);

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
    checkStatus(response, 201);
    expect(hasAnswerKeys(response.body.data));
    expect(hasMissionKeys(response.body.data.mission));
    expect(response.body.data.content).toBe(content);
    expect(response.body.data.missionId).toBe(missionId);
  });

  it('Post /api/v1/answers Exist', async () => {
    const existResponse = await request(app)
      .post('/api/v1/answers')
      .set('Authorization', token)
      .field('missionId', missionId)
      .field('content', 'aaa')
      .attach('file', file);
    checkStatus(existResponse, 400);
    expect(existResponse.body.message).toBe('해당날짜에 답변이 존재합니다.');
  });

  it('Get /api/v1/answers/{date}', async () => {
    const date = moment().format('YYYY-MM-DD');

    response = await request(app)
      .get(`/api/v1/answers/${date}`)
      .set('Authorization', token);
    checkStatus(response);
    expect(hasAnswerKeys(response.body.data));
    expect(hasMissionKeys(response.body.data.mission));
  });

  it('Put /api/v1/answers/{id}', async () => {
    const content = 'bbb';
    response = await request(app)
      .put(`/api/v1/answers/${response.body.data.id}`)
      .set('Authorization', token)
      .field('content', content)
      .attach('file', file);
    checkStatus(response);
    expect(hasAnswerKeys(response.body.data));
    expect(hasMissionKeys(response.body.data.mission));
    expect(response.body.data.content).toBe(content);
  });

  it('Get /api/v1/answers/week', async () => {
    const response = await request(app)
      .get('/api/v1/answers/week')
      .set('Authorization', token);
    checkStatus(response);
    expect(response.body.data.today).toBeTruthy();
    expect(response.body.data.answers.length === 7).toBeTruthy();
  });

  it('Get /api/v1/answers/month', async () => {
    const today = moment();
    const response = await request(app)
      .get('/api/v1/answers/month')
      .set('Authorization', token);
    checkStatus(response);
    expect(response.body.data.answers.length > 0).toBeTruthy();
    expect(response.body.data.answers[0].length === 7).toBeTruthy();
    expect(response.body.data.date).toBe(`${today.format('YYYY-MM')}-01`);
    // expect(hasAnswerKeys(response.body.data.answers[0][0]));
    // expect(hasMissionKeys(response.body.data.answers[0][0].mission));
  });

  it('Get /api/v1/answers/month?date={date}', async () => {
    const month = moment().add(-1, 'months');
    const date = month.format('YYYY-MM-DD');

    const haveDateResponse = await request(app)
      .get(`/api/v1/answers/month?date=${date}`)
      .set('Authorization', token);
    checkStatus(response);
    expect(haveDateResponse.body.data.answers.length > 0).toBeTruthy();
    expect(haveDateResponse.body.data.answers[0].length === 7).toBeTruthy();
    expect(haveDateResponse.body.data.date).toBe(`${month.format('YYYY-MM')}-01`);
  });

  it('Delete /api/v1/answers/{id}', async () => {
    response = await request(app)
      .delete(`/api/v1/answers/${response.body.data.id}`)
      .set('Authorization', token);
    checkStatus(response, 204);
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
