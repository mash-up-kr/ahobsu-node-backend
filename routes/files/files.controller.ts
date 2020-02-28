import response from '../../lib/response';
import { RequestResponseNext } from '..';
import { isRequired } from './files.service';
import { createFile, getFileById, updateFile, deleteFile } from './files.repository';

const create: RequestResponseNext = async (req, res, next) => {
  try {
    const { file: cardUrl, part: partString } = req.body;
    const part = parseInt(partString, 10);
    const file = await createFile({ cardUrl, part });
    res.json(response({ status: 201, data: file }));
  } catch (e) {
    console.log(e);
    res.json(response({ status: 500, message: e.message }));
  }
};
const update: RequestResponseNext = async (req, res, next) => {
  try {
    const { file: cardUrl, part: partString } = req.body;
    const id = parseInt(req.params.id, 10);
    const part = parseInt(partString, 10);
    await updateFile({ id, cardUrl, part });
    const file = await getFileById(id);
    res.json(response({ data: file }));
  } catch (e) {
    console.log(e);
    res.json(response({ status: 500, message: e.message }));
  }
};
const destroy: RequestResponseNext = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    await deleteFile(id);
    res.json(response({ status: 204, message: '파일을 삭제 했습니다.' }));
  } catch (e) {
    console.log(e);
    res.json(response({ status: 500, message: e.message }));
  }
};
export default {
  create,
  update,
  destroy,
};
