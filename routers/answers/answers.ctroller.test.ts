import answersController from './answers.ctroller';
jest.mock('../../models')
import db from '../../models';


describe('listId', () => {
  const req: any  = {
    user: {id: 2},
    params: {id: 2},
  }
  const res: any = {
    status: jest.fn(() => res),
    send: jest.fn(),
    json: jest.fn(() => res),
  }
  const next = jest.fn();
  
  test('listId no answers', async () => {
    (db.Answer.findOne as any).mockReturnValue(Promise.resolve({}));
    await answersController.listId(req, res, next);
    expect(res.json).toBeCalledWith({"data": [], "message": "", "status": 200});
  })

  test('listId answers', async () => {
    (db.Answer.findOne as any).mockReturnValue(Promise.resolve({setDate: true}));
    (db.Answer.findAll as any).mockReturnValue(Promise.resolve([{id: 1}, {id: 2}]));
    await answersController.listId(req, res, next);
    expect(res.json).toBeCalledWith({"data": [{id: 1}, {id: 2}], "message": "", "status": 200, });
  })

  test('listId answers error', async () => {
    const error  = { message: '테스트용 에러'};
    (db.Answer.findOne as any).mockReturnValue(Promise.reject(error));
    (db.Answer.findAll as any).mockReturnValue(Promise.resolve([{id: 1}, {id: 2}]));
    await answersController.listId(req, res, next);
    expect(res.status).toBeCalledWith(500);
    expect(res.json).toBeCalledWith({"message": error.message, "status": 500, "data": null,});
  })
})