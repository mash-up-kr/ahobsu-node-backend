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
    .send({ snsId: '1', snsType: 'apple' });
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
    expect(hasMissionKeys(response.body.data));
  });

  it('Get /api/v1/missions/{id}', async () => {
    response = await request(app)
      .get(`/api/v1/missions/${response.body.data.id}`)
      .set('Authorization', token);
    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe(200);
    expect(hasMissionKeys(response.body.data));
  });

  it('Put /api/v1/missions/{id}', async () => {
    response = await request(app)
      .get(`/api/v1/missions/${response.body.data.id}`)
      .set('Authorization', token)
      .send({ title: '문제수정', isContent: true, isImage: true, cycle: 1 });
    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe(200);
    expect(hasMissionKeys(response.body.data));
  });

  it('Delete /api/v1/missions/{id}', async () => {
    response = await request(app)
      .delete(`/api/v1/missions/${response.body.data.id}`)
      .set('Authorization', token);
    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe(204);
    expect(response.body.message).toBe('문제를 삭제 했습니다.');
  });
});

describe('missions', () => {
  let mission1 = null;
  let mission2 = null;
  let mission3 = null;

  it('Post /api/v1/missions', async () => {
    mission1 = await request(app)
      .post('/api/v1/missions')
      .set('Authorization', token)
      .send({ title: '안녕2', isContent: true, isImage: false, cycle: 1 });
    mission2 = await request(app)
      .post('/api/v1/missions')
      .set('Authorization', token)
      .send({ title: '안녕2', isContent: true, isImage: false, cycle: 1 });
    mission3 = await request(app)
      .post('/api/v1/missions')
      .set('Authorization', token)
      .send({ title: '안녕2', isContent: true, isImage: false, cycle: 1 });
  });

  it('Get /api/v1/missions', async () => {
    response = await request(app)
      .get(`/api/v1/missions`)
      .set('Authorization', token);
    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe(200);
    expect('refresh' in response.body.data).toBeTruthy();
    expect(response.body.data.missions.length).toBe(3);
    expect(hasMissionKeys(response.body.data.missions[0]));
  });

  it('Get /api/v1/missions/refresh', async () => {
    await request(app)
      .put(`/api/v1/users/refresh`)
      .set('Authorization', token);

    response = await request(app)
      .get(`/api/v1/missions/refresh`)
      .set('Authorization', token);
    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe(200);
    expect(response.body.data.refresh).toBe(false);
    expect(response.body.data.missions.length).toBe(3);
    expect(hasMissionKeys(response.body.data.missions[0]));
  });

  it('Get /api/v1/missions/refresh before refresh', async () => {
    response = await request(app)
      .get(`/api/v1/missions/refresh`)
      .set('Authorization', token);
    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe(400);
    expect(response.body.message).toBe('갱신 횟수가 모자랍니다.');
  });

  it('Delete /api/v1/missions/{id}', async () => {
    mission1 = await request(app)
      .delete(`/api/v1/missions/${mission1.body.data.id}`)
      .set('Authorization', token);
    mission2 = await request(app)
      .delete(`/api/v1/missions/${mission2.body.data.id}`)
      .set('Authorization', token);
    mission3 = await request(app)
      .delete(`/api/v1/missions/${mission3.body.data.id}`)
      .set('Authorization', token);
  });
});

function hasMissionKeys(data) {
  if (!('id' in data)) throw new Error('missing id key');
  if (!('title' in data)) throw new Error('missing title key');
  if (!('isContent' in data)) throw new Error('missing isContent key');
  if (!('isImage' in data)) throw new Error('missing isImage key');
  if (!('cycle' in data)) throw new Error('missing cycle key');
}
