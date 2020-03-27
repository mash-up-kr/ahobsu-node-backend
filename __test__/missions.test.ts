import request, { Response } from 'supertest';
import app from '../app';
import connectDB from '../connectDB';
import Mission from '../models/mission';
import { signin } from './signin.test';
import { hasUserKeys, putUserRefresh } from './users.test';
import { checkStatus, Request } from './util';

const req = request(app);
let token = '';

beforeAll(async () => {
  await connectDB();

  const {
    body: {
      data: { accessToken },
    },
  } = await signin(req);
  token = accessToken;
});

describe('missions', () => {
  let response: Response;
  it('Post /api/v1/missions', async () => {
    const title = '안녕';
    const isContent = true;
    const isImage = false;
    const cycle = 1;
    response = await postMission({ req, token, title, isContent, isImage, cycle });
    checkStatus(response, 201);
    expect(hasMissionKeys(response.body.data));
    expect(response.body.data.title).toBe(title);
    expect(response.body.data.isContent).toBe(isContent);
    expect(response.body.data.isImage).toBe(isImage);
    expect(response.body.data.cycle).toBe(cycle);
  });

  it('Get /api/v1/missions/{id}', async () => {
    const { id } = response.body.data;
    response = await getMissionById({ req, token, id });
    checkStatus(response);
    expect(hasMissionKeys(response.body.data));
  });

  it('Put /api/v1/missions/{id}', async () => {
    const title = '문제수정';
    const isContent = false;
    const isImage = true;
    const cycle = 2;
    const { id } = response.body.data;
    response = await putMission({ req, token, id, title, isContent, isImage, cycle });
    checkStatus(response);
    expect(hasMissionKeys(response.body.data));
    expect(response.body.data.title).toBe(title);
    expect(response.body.data.isContent).toBe(isContent);
    expect(response.body.data.isImage).toBe(isImage);
    expect(response.body.data.cycle).toBe(cycle);
  });

  it('Delete /api/v1/missions/{id}', async () => {
    const { id } = response.body.data;
    response = await deleteMission({ req, token, id });
    checkStatus(response, 204);
  });
});

describe('missions', () => {
  let response: Response;
  let mission1: Response;
  let mission2: Response;
  let mission3: Response;

  it('Post /api/v1/missions', async () => {
    const title = '안녕';
    const isContent = true;
    const isImage = false;
    const cycle = 1;
    mission1 = await postMission({ req, token, title, isContent, isImage, cycle });
    mission2 = await postMission({ req, token, title, isContent, isImage, cycle });
    mission3 = await postMission({ req, token, title, isContent, isImage, cycle });
  });

  it('Get /api/v1/missions', async () => {
    const {
      body: {
        data: { accessToken },
      },
    } = await signin(req);
    token = accessToken;
    response = await getMissions({ req, token });
    checkStatus(response);
    expect('refresh' in response.body.data).toBeTruthy();
    // expect(response.body.data.missions.length).toBe(3);
    // expect(hasMissionKeys(response.body.data.missions[0]));
    // expect(hasMissionKeys(response.body.data.missions[1]));
    // expect(hasMissionKeys(response.body.data.missions[2]));
  });

  it('Get /api/v1/missions/refresh', async () => {
    const responseUserRefresh = await putUserRefresh({ req, token });
    checkStatus(responseUserRefresh);
    expect(hasUserKeys(responseUserRefresh.body.data));

    response = await getMissionRefresh({ req, token });
    checkStatus(response);
    expect(response.body.data.refresh).toBe(false);
    // expect(response.body.data.missions.length).toBe(3);
    // expect(hasMissionKeys(response.body.data.missions[0]));
    // expect(hasMissionKeys(response.body.data.missions[1]));
    // expect(hasMissionKeys(response.body.data.missions[2]));
  });

  it('Get /api/v1/missions/refresh before refresh', async () => {
    response = await getMissionRefresh({ req, token });
    checkStatus(response, 400);
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

export const hasMissionKeys = (data: Mission) => {
  if (!('id' in data)) throw new Error('missing id key');
  if (!('title' in data)) throw new Error('missing title key');
  if (!('isContent' in data)) throw new Error('missing isContent key');
  if (!('isImage' in data)) throw new Error('missing isImage key');
  if (!('cycle' in data)) throw new Error('missing cycle key');
};

export const postMission = async ({
  req,
  token,
  title,
  isContent,
  isImage,
  cycle,
}: {
  req: Request;
  token: string;
  title: string;
  isContent: boolean;
  isImage: boolean;
  cycle: number;
}) => {
  return req
    .post('/api/v1/missions')
    .set('Authorization', token)
    .send({ title, isContent, isImage, cycle });
};

const getMissionById = async ({ req, token, id }: { req: Request; token: string; id: number }) => {
  return req.get(`/api/v1/missions/${id}`).set('Authorization', token);
};

const putMission = async ({
  req,
  token,
  id,
  title,
  isContent,
  isImage,
  cycle,
}: {
  req: Request;
  token: string;
  id: number;
  title: string;
  isContent: boolean;
  isImage: boolean;
  cycle: number;
}) => {
  return req
    .put(`/api/v1/missions/${id}`)
    .set('Authorization', token)
    .send({ title, isContent, isImage, cycle });
};

const deleteMission = async ({ req, token, id }: { req: Request; token: string; id: number }) => {
  return req.delete(`/api/v1/missions/${id}`).set('Authorization', token);
};

const getMissions = async ({ req, token }: { req: Request; token: string }) => {
  return req.get(`/api/v1/missions`).set('Authorization', token);
};

const getMissionRefresh = async ({ req, token }: { req: Request; token: string }) => {
  return req.get(`/api/v1/missions/refresh`).set('Authorization', token);
};
