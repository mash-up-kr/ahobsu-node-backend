import { RequestResponseNext } from '..';
import response from '../../lib/response';
import { getFileById } from './files.repository';
import { isRequired } from './files.service';

export const checkRequire: RequestResponseNext = (req, res, next) => {
  const { file: cardUrl } = req.body;
  if (isRequired({ cardUrl })) {
    return res.status(412).json(response({ status: 412, message: '필수 파라미터가 없습니다.' }));
  }
  next();
};

export const checkPart: RequestResponseNext = (req, res, next) => {
  const { part } = req.body;
  if (isNaN(part)) {
    return res.status(412).json(response({ status: 412, message: 'part는 숫자이어야 합니다.' }));
  }
  next();
};

export const checkFile: RequestResponseNext = async (req, res, next) => {
  const id = parseInt(req.params.id, 10);
  const file = await getFileById(id);
  if (!file) {
    return res.status(404).json(response({ status: 404, message: '존재하지않는 fileId.' }));
  }
  next();
};
