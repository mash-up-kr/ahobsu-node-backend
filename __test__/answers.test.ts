import moment from 'moment';
import path from 'path';
import request from 'supertest';
import app from '../app';
import connectDB from '../connectDB';
import { postFile } from './files.test';
import { hasMissionKeys, postMission } from './missions.test';
import { signin } from './signin.test';
import { checkStatus } from './util';

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

describe('answers', () => {
  let response = null;
  const file = path.join(__dirname, '../public/bigSizeimg.jpeg');
  const date = moment().format('YYYY-MM-DD');
  let missionId = null;
  it('Post /api/v1/answers', async () => {
    response = await getAnswerByDate({ req, date, token });
    checkStatus(response);

    if (response.body.data) {
      const { id } = response.body.data;
      response = await deleteAnswerById({ req, id, token });
      checkStatus(response);
    }
    {
      await Promise.all([
        // 1
        postFile({ req, token, file, part: 1 }),
        // 2
        postFile({ req, token, file, part: 2 }),
        // 3
        postFile({ req, token, file, part: 3 }),
        // 4
        postFile({ req, token, file, part: 4 }),
        // 5
        postFile({ req, token, file, part: 5 }),
        // 6
        postFile({ req, token, file, part: 6 }),
      ]);
    }
    const title = '안녕';
    const isContent = true;
    const isImage = false;
    const cycle = 1;
    const content = 'aaa';
    response = await postMission({ req, token, title, isContent, isImage, cycle });
    missionId = response.body.data.id;
    response = await postAnswer({ req, token, missionId, content, file });
    checkStatus(response, 201);
    expect(hasAnswerKeys(response.body.data));
    expect(hasMissionKeys(response.body.data.mission));
    expect(response.body.data.content).toBe(content);
    expect(response.body.data.missionId).toBe(missionId);
  });

  it('Post /api/v1/answers Exist', async () => {
    const content = 'aaa';
    const existResponse = await postAnswer({ req, token, missionId, content, file });
    checkStatus(existResponse, 400);
    expect(existResponse.body.message).toBe('해당날짜에 답변이 존재합니다.');
  });

  it('Get /api/v1/answers/{date}', async () => {
    const date = moment().format('YYYY-MM-DD');
    response = await getAnswerByDate({ req, date, token });
    checkStatus(response);
    expect(hasAnswerKeys(response.body.data));
    expect(hasMissionKeys(response.body.data.mission));
  });

  it('Put /api/v1/answers/{id}', async () => {
    const content = 'bbb';
    const { id } = response.body.data;
    response = await putAnswer({ req, token, id, content, file });
    checkStatus(response);
    expect(hasAnswerKeys(response.body.data));
    expect(hasMissionKeys(response.body.data.mission));
    expect(response.body.data.content).toBe(content);
  });

  it('Get /api/v1/answers/week', async () => {
    const response = await getAnswersWeek({ req, token });
    checkStatus(response);
    expect(response.body.data.today).toBeTruthy();
  });

  it('Get /api/v1/answers/month', async () => {
    const today = moment();
    const response = await getAnswersMonthByDate({ req, token, date: null });
    checkStatus(response);
    // expect(response.body.data.answers.length > 0).toBeTruthy();
    expect(response.body.data.date).toBe(`${today.format('YYYY-MM')}-01`);
    // expect(hasAnswerKeys(response.body.data.answers[0][0]));
    // expect(hasMissionKeys(response.body.data.answers[0][0].mission));
  });

  it('Get /api/v1/answers/month?date={date}', async () => {
    const month = moment().add(-1, 'months');
    const date = month.format('YYYY-MM-DD');

    const haveDateResponse = await getAnswersMonthByDate({ req, token, date });
    checkStatus(response);
    // expect(haveDateResponse.body.data.answers.length > 0).toBeTruthy();
    expect(haveDateResponse.body.data.date).toBe(`${month.format('YYYY-MM')}-01`);
  });

  it('Delete /api/v1/answers/{id}', async () => {
    const { id } = response.body.data;
    response = await deleteAnswerById({ req, id, token });
    checkStatus(response, 204);
    expect(response.body.message).toBe('답변을 삭제 했습니다.');
  });
});

const hasAnswerKeys = data => {
  if (!('id' in data)) throw new Error('missing id key');
  if (!('userId' in data)) throw new Error('missing userId key');
  if (!('missionId' in data)) throw new Error('missing missionId key');
  if (!('imageUrl' in data)) throw new Error('missing imageUrl key');
  if (!('cardUrl' in data)) throw new Error('missing cardUrl key');
  if (!('content' in data)) throw new Error('missing content key');
  if (!('date' in data)) throw new Error('missing date key');
  if (!('setDate' in data)) throw new Error('missing setDate key');
};

const getAnswerByDate = async ({ req, date, token }) => {
  return req.get(`/api/v1/answers/${date}`).set('Authorization', token);
};

const deleteAnswerById = async ({ req, id, token }) => {
  return req.delete(`/api/v1/answers/${id}`).set('Authorization', token);
};

const postAnswer = async ({ req, token, missionId, content, file }) => {
  return req
    .post('/api/v1/answers')
    .set('Authorization', token)
    .field('missionId', missionId)
    .field('content', content)
    .attach('file', file);
};

const putAnswer = async ({ req, token, id, content, file }) => {
  return req
    .put(`/api/v1/answers/${id}`)
    .set('Authorization', token)
    .field('content', content)
    .attach('file', file);
};

const getAnswersWeek = async ({ req, token }) => {
  return req.get('/api/v1/answers/week').set('Authorization', token);
};

const getAnswersMonthByDate = async ({ req, token, date }) => {
  return req.get(`/api/v1/answers/month${date ? `?date=${date}` : ''}`).set('Authorization', token);
};
