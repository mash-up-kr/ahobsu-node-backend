import request from 'supertest';
import app from '../app';
import connectDB from '../connectDB';
import Question from '../models/question';
import { checkStatus, Request } from './util';

const req = request(app);

beforeAll(async () => {
  await connectDB();
});

describe('signin', () => {
  it('Post /api/v1/questions', async () => {
    const content = '나는 누구인가?';
    const response = await postQuestion({ req, content });
    checkStatus(response, 201);
    expect(hasPostApiV1Questions(response.body.data));
  });
  it('Get /api/v1/questions', async () => {
    const response = await GetQuestions({ req });
    checkStatus(response);
    expect(hasPostApiV1Questions(response.body.data.questions[0]));
    expect(typeof response.body.data.questionTotalCount).toBe('number');
  });
  it('Get /api/v1/questions?page=2&limit=10', async () => {
    const response = await GetQuestions({ req });
    checkStatus(response);
    expect(typeof response.body.data.questionTotalCount).toBe('number');
  });
});

const hasPostApiV1Questions = (data: Question) => {
  if (!('id' in data)) throw new Error('missing id key');
  if (!('content' in data)) throw new Error('missing content key');
};

const postQuestion = async ({ req, content }: { req: Request; content: string }) => {
  return req.post('/api/v1/questions').send({ content });
};

const GetQuestions = async ({ req }: { req: Request }) => {
  return req.get('/api/v1/questions');
};
