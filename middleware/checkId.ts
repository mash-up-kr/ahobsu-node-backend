import response from '../lib/response';
import { RequestResponseNext } from '../routes';

const checkId: RequestResponseNext = async (req, res, next) => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) {
    return res.status(412).json(response({ status: 412, message: 'id가 올바르지 않습니다.' }));
  }
  next();
};

export default checkId;
