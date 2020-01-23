const request = require('supertest');
const app = require('../app');
const path = require('path');
const moment = require('moment');

let token = null;

beforeAll(async () => {
  const {
    body: {
      data: { accessToken },
    },
  } = await request(app)
    .post('/api/v1/signin')
    .send({ snsId: 1 });
  token = accessToken;
});

describe('Test /api/v1/answers', () => {
  it('should return world!', async () => {
    const date = moment().format('YYYY-MM-DD');
    console.log(date);
    const answer = await request(app)
      .get(`/api/v1/answers/${date}`)
      .set('Authorization', token);
    console.log(answer.body);
    if (answer.body.data) {
      const aaa = await request(app)
        .delete(`/api/v1/answers/${answer.body.data.id}`)
        .set('Authorization', token);
      console.log(123, answer.body.data.id, aaa.body);
    }
    const file = path.join(__dirname, '/money.jpg');
    const response = await request(app)
      .post('/api/v1/answers')
      .set('Authorization', token)
      .field('missionId', 1)
      .field('content', 'aaa')
      .attach('file', file);
    console.log(111, response.body);
    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe(200);
    expect(hasPostApiV1AnswersKeys);
  });
});

function hasPostApiV1AnswersKeys(res) {
  if (!('id' in res.body)) throw new Error('missing id key');
  if (!('userId' in res.body)) throw new Error('missing userId key');
  if (!('missionId' in res.body)) throw new Error('missing missionId key');
  if (!('imageUrl' in res.body)) throw new Error('missing imageUrl key');
  if (!('cardUrl' in res.body)) throw new Error('missing cardUrl key');
  if (!('content' in res.body)) throw new Error('missing content key');
  if (!('date' in res.body)) throw new Error('missing date key');
}
