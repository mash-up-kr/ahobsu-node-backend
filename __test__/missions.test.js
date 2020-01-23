// tests/status.test.js
const request = require('supertest');
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
    .send({ snsId: 1 });
  token = accessToken;
});

describe('missions', () => {
  it('Post /api/v1/missions', async () => {
    response = await request(app)
      .post('/api/v1/missions')
      .set('Authorization', token)
      .send({ title: '안녕', isContent: true, isImage: false, cycle: 1 });
    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe(201);
    expect(hasMissionKeys);
  });

  it('Delete /api/v1/missions/{id}', async () => {
    response = await request(app)
      .delete(`/api/v1/missions/${response.body.data.id}`)
      .set('Authorization', token);
    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe(200);
  });
});

function hasMissionKeys(res) {
  if (!('id' in res.body)) throw new Error('missing id key');
  if (!('title' in res.body)) throw new Error('missing title key');
  if (!('isContent' in res.body)) throw new Error('missing isContent key');
  if (!('isImage' in res.body)) throw new Error('missing isImage key');
  if (!('cycle' in res.body)) throw new Error('missing cycle key');
}
