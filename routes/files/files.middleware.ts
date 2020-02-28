import { RequestResponseNext } from '..';
import { isRequired } from './files.service';
import response from '../../lib/response';
import { getFileById } from './files.repository';

export const checkRequire: RequestResponseNext = (req, res, next) => {
  const { file: cardUrl, part } = req.body;
  if (isRequired({ cardUrl, part })) {
    return res.json(response({ status: 412, message: '필수 파라미터가 없습니다.' }));
  }
  next();
};

export const checkPart: RequestResponseNext = (req, res, next) => {
  const { part } = req.body;
  if (isNaN(part)) {
    return res.json(response({ status: 412, message: 'part는 숫자이어야 합니다.' }));
  }
  next();
};

export const checkId: RequestResponseNext = (req, res, next) => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) {
    return res.json(response({ status: 412, message: 'id가 올바르지 않습니다.' }));
  }
  next();
};

export const checkFile: RequestResponseNext = async (req, res, next) => {
  const id = parseInt(req.params.id, 10);
  const file = await getFileById(id);
  if (!file) {
    return res.json(response({ status: 404, message: '존재하지않는 fileId.' }));
  }
  next();
};
