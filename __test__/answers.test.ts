import path from 'path';
import request, { Response } from 'supertest';
import app from '../app';
import connectDB from '../connectDB';
import { getDateString, getFirstDate, getNow } from '../lib/date';
import Answer from '../models/answer';
import { hasFileKeys, postFile } from './files.test';
import { hasMissionKeys, postMission } from './missions.test';
import { signin } from './signin.test';
import { checkStatus, Request } from './util';

let token = '';
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
  let response: Response;
  const file = path.join(__dirname, '../public/bigSizeimg.jpeg');
  const date = getDateString({});
  let missionId = 0;

  it('6개의 파츠 생성', async () => {
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
  });
  it('Post /api/v1/answers with content', async () => {
    // 기존에 데이터가 있다면 제거
    await checkAnswer();

    // 미션 생성
    const title = '안녕';
    const isContent = true;
    const isImage = false;
    const cycle = 1;
    response = await postMission({ req, token, title, isContent, isImage, cycle });
    expect(response.body.data.title).toBe(title);
    expect(response.body.data.isContent).toBe(isContent);
    expect(response.body.data.isImage).toBe(isImage);
    expect(response.body.data.cycle).toBe(cycle);

    // content만
    missionId = response.body.data.id;
    const content = 'aaa';
    response = await postAnswer({ req, token, missionId, content });
    checkStatus(response, 201);
    expect(hasAnswerKeys(response.body.data));
    expect(hasMissionKeys(response.body.data.mission));
    expect(response.body.data.content).toBe(content);
    expect(response.body.data.imageUrl).toBe(null);
    expect(response.body.data.missionId).toBe(missionId);
    expect(response.body.data.mission.title).toBe(title);
    expect(response.body.data.mission.isContent).toBe(isContent);
    expect(response.body.data.mission.isImage).toBe(isImage);
    expect(response.body.data.mission.cycle).toBe(cycle);
  });

  it('Put /api/v1/answers/{id} content', async () => {
    const content = 'bbb';
    const { id } = response.body.data;
    response = await putAnswer({ req, token, id, content });
    checkStatus(response);
    expect(hasAnswerKeys(response.body.data));
    expect(hasMissionKeys(response.body.data.mission));
    expect(response.body.data.content).toBe(content);
  });

  it('Post /api/v1/answers with file', async () => {
    // 기존에 데이터가 있다면 제거
    await checkAnswer();

    // 미션 생성
    const title = '안녕';
    const isContent = false;
    const isImage = true;
    const cycle = 1;
    response = await postMission({ req, token, title, isContent, isImage, cycle });
    checkStatus(response, 201);
    expect(response.body.data.title).toBe(title);
    expect(response.body.data.isContent).toBe(isContent);
    expect(response.body.data.isImage).toBe(isImage);
    expect(response.body.data.cycle).toBe(cycle);

    // file만
    missionId = response.body.data.id;
    response = await postAnswer({ req, token, missionId, file });
    checkStatus(response, 201);
    expect(hasAnswerKeys(response.body.data));
    expect(hasMissionKeys(response.body.data.mission));
    expect(hasFileKeys(response.body.data.file));
    expect(response.body.data.content).toBe(null);
    expect(response.body.data.imageUrl).toBeTruthy();
    expect(response.body.data.missionId).toBe(missionId);
    expect(response.body.data.mission.title).toBe(title);
    expect(response.body.data.mission.isContent).toBe(isContent);
    expect(response.body.data.mission.isImage).toBe(isImage);
    expect(response.body.data.mission.cycle).toBe(cycle);
  });

  it('Put /api/v1/answers/{id} file', async () => {
    const { id } = response.body.data;
    response = await putAnswer({ req, token, id, file });
    checkStatus(response);
    expect(hasAnswerKeys(response.body.data));
    expect(hasMissionKeys(response.body.data.mission));
    expect(hasFileKeys(response.body.data.file));
    expect(response.body.data.imageUrl.length).toBeTruthy();
  });

  it('Post /api/v1/answers with content and file', async () => {
    // 기존에 데이터가 있다면 제거
    await checkAnswer();

    // 미션 생성
    const title = '안녕';
    const isContent = true;
    const isImage = true;
    const cycle = 1;
    response = await postMission({ req, token, title, isContent, isImage, cycle });
    checkStatus(response, 201);
    expect(response.body.data.title).toBe(title);
    expect(response.body.data.isContent).toBe(isContent);
    expect(response.body.data.isImage).toBe(isImage);
    expect(response.body.data.cycle).toBe(cycle);

    // content, file
    missionId = response.body.data.id;
    const content = 'aaa';
    response = await postAnswer({ req, token, missionId, content, file });
    checkStatus(response, 201);
    expect(hasAnswerKeys(response.body.data));
    expect(hasMissionKeys(response.body.data.mission));
    expect(hasFileKeys(response.body.data.file));
    expect(response.body.data.content).toBe(content);
    expect(response.body.data.imageUrl.length).toBeTruthy();
    expect(response.body.data.missionId).toBe(missionId);
    expect(response.body.data.mission.title).toBe(title);
    expect(response.body.data.mission.isContent).toBe(isContent);
    expect(response.body.data.mission.isImage).toBe(isImage);
    expect(response.body.data.mission.cycle).toBe(cycle);
  });

  it('Put /api/v1/answers/{id} content and file', async () => {
    const content = 'bbb';
    const { id } = response.body.data;
    response = await putAnswer({ req, token, id, content, file });
    checkStatus(response);
    expect(hasAnswerKeys(response.body.data));
    expect(hasMissionKeys(response.body.data.mission));
    expect(hasFileKeys(response.body.data.file));
    expect(response.body.data.content).toBe(content);
    expect(response.body.data.imageUrl.length).toBeTruthy();
  });

  it('Post /api/v1/answers Exist', async () => {
    const content = 'aaa';
    const existResponse = await postAnswer({ req, token, missionId, content });
    checkStatus(existResponse, 400);
    expect(existResponse.body.message).toBe('해당날짜에 답변이 존재합니다.');
  });

  it('Get /api/v1/answers', async () => {
    const date = getDateString({});
    response = await getAnswerByDate({ req, token });
    checkStatus(response);
    expect(hasAnswerKeys(response.body.data));
    expect(hasMissionKeys(response.body.data.mission));
    expect(hasFileKeys(response.body.data.file));
    response = await getAnswerByDate({ req, date, token });
  });

  it('Get /api/v1/answers/week', async () => {
    const response = await getAnswersWeek({ req, token });
    checkStatus(response);
    expect(response.body.data.today).toBeTruthy();
    checkStatus(response);
    expect(hasAnswerKeys(response.body.data.answers[0]));
    expect(hasMissionKeys(response.body.data.answers[0].mission));
    expect(hasFileKeys(response.body.data.answers[0].file));
  });

  it('Get /api/v1/answers/month', async () => {
    const firstDate = getFirstDate(getNow());
    const response = await getAnswersMonthByDate({ req, token, date: '' });
    checkStatus(response);
    expect(response.body.data.date).toBe(firstDate);
    expect(hasAnswerKeys(response.body.data.monthAnswer[0][0]));
    expect(hasMissionKeys(response.body.data.monthAnswer[0][0].mission));
    expect(hasFileKeys(response.body.data.monthAnswer[0][0].file));
  });

  it('Get /api/v1/answers/month?date={date}', async () => {
    const firstDate = getFirstDate(getNow(getDateString({ month: -1 })));
    const haveDateResponse = await getAnswersMonthByDate({ req, token, date: firstDate });
    checkStatus(response);
    expect(haveDateResponse.body.data.date).toBe(firstDate);
    expect(haveDateResponse.body.data.monthAnswer.length).toBe(0);
  });

  it('Get /api/v1/answers?date={date}', async () => {
    const date = getDateString({});
    response = await getAnswerByDate({ req, token });
    checkStatus(response);
    expect(hasAnswerKeys(response.body.data));
    expect(hasMissionKeys(response.body.data.mission));
    expect(hasFileKeys(response.body.data.file));
  });

  it('Get /api/v1/answers/{id}', async () => {
    const { id } = response.body.data;
    response = await getAnswerById({ req, id, token });
    expect(hasAnswerKeys(response.body.data));
    expect(hasMissionKeys(response.body.data.mission));
    expect(hasFileKeys(response.body.data.file));
  });

  it('Delete /api/v1/answers/{id}', async () => {
    const { id } = response.body.data;
    response = await deleteAnswerById({ req, id, token });
    checkStatus(response, 204);
  });
});

const hasAnswerKeys = (data: Answer) => {
  if (!('id' in data)) throw new Error('missing id key');
  if (!('userId' in data)) throw new Error('missing userId key');
  if (!('missionId' in data)) throw new Error('missing missionId key');
  if (!('fileId' in data)) throw new Error('missing fileId key');
  if (!('imageUrl' in data)) throw new Error('missing imageUrl key');
  if (!('content' in data)) throw new Error('missing content key');
  if (!('date' in data)) throw new Error('missing date key');
  if (!('setDate' in data)) throw new Error('missing setDate key');
  if (!('no' in data)) throw new Error('missing no key');
};

const getAnswerByDate = async ({ req, date, token }: { req: Request; date?: string; token: string }) => {
  return req.get(`/api/v1/answers${date ? `?date=${date}` : ''}`).set('Authorization', token);
};

const deleteAnswerById = async ({ req, id, token }: { req: Request; id: number; token: string }) => {
  return req.delete(`/api/v1/answers/${id}`).set('Authorization', token);
};

const getAnswerById = async ({ req, id, token }: { req: Request; id: number; token: string }) => {
  return req.get(`/api/v1/answers/${id}`).set('Authorization', token);
};
const postAnswer = async ({
  req,
  token,
  missionId,
  content,
  file,
}: {
  req: Request;
  token: string;
  missionId: number;
  content?: string | null;
  file?: string | null;
}) => {
  // 둘다 있는 경우
  if (!!content && file) {
    return req
      .post('/api/v1/answers')
      .set('Authorization', token)
      .field('missionId', missionId)
      .field('content', content)
      .attach('file', file);
    // content만 있는 경우
  } else if (!file && !!content) {
    return req
      .post('/api/v1/answers')
      .set('Authorization', token)
      .field('missionId', missionId)
      .field('content', content);
    // file만 있는 경우
  } else if (!content && !!file) {
    return req
      .post('/api/v1/answers')
      .set('Authorization', token)
      .field('missionId', missionId)
      .attach('file', file);
  }
  throw 'content, file 둘 중 하나는 있어야 합니다.';
};

const putAnswer = async ({
  req,
  token,
  id,
  content,
  file,
}: {
  req: Request;
  token: string;
  id: number;
  content?: string;
  file?: string;
}) => {
  if (!!content && !!file) {
    return req
      .put(`/api/v1/answers/${id}`)
      .set('Authorization', token)
      .field('content', content)
      .attach('file', file);
    // content만 있는 경우
  } else if (!file && !!content) {
    return req
      .put(`/api/v1/answers/${id}`)
      .set('Authorization', token)
      .field('content', content);
    // file만 있는 경우
  } else if (!content && !!file) {
    return req
      .put(`/api/v1/answers/${id}`)
      .set('Authorization', token)
      .attach('file', file);
  }
  throw 'content, file 둘 중 하나는 있어야 합니다.';
};

const getAnswersWeek = async ({ req, token }: { req: Request; token: string }) => {
  return req.get('/api/v1/answers/week').set('Authorization', token);
};

const getAnswersMonthByDate = async ({ req, token, date }: { req: Request; token: string; date: string }) => {
  return req.get(`/api/v1/answers/month${date ? `?date=${date}` : ''}`).set('Authorization', token);
};

const checkAnswer = async () => {
  // 기존에 데이터가 있다면 제거
  const date = getDateString({});
  let response = await getAnswerByDate({ req, token });
  checkStatus(response);
  if (response.body.data && response.body.data.id) {
    const { id } = response.body.data;
    response = await deleteAnswerById({ req, id, token });
    checkStatus(response, 204);
  }
};
