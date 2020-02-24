import response from '../../lib/response';
import { RequestResponseNext } from '..';
import { isRequired } from './files.service';
import { createFile, getFileById, updateFile, deleteFile } from './files.repository';

// const date = async (req, res, next) => {
//   const { date } = req.params;
//   try {
//     const file = await getFileByDate(date);
//     res.json(response({ data: file }));
//   } catch (e) {
//     console.log(e);
//     res.json(response({ status: 500, message: e.message }));
//   }
// };
const create: RequestResponseNext = async (req, res, next) => {
  try {
    const { file: cardUrl, part } = req.body;

    if (isRequired({ cardUrl, part })) {
      return res.json(response({ status: 412, message: '필수 파라미터가 없습니다.' }));
    }
    {
      const file = await createFile({ cardUrl, part: parseInt(part, 10) });
      res.json(response({ status: 201, data: file }));
    }
  } catch (e) {
    console.log(e);
    res.json(response({ status: 500, message: e.message }));
  }
};
const update: RequestResponseNext = async (req, res, next) => {
  try {
    const { file: cardUrl, part } = req.body;
    const id = parseInt(req.params.id, 10);

    if (isNaN(id)) {
      return res.json(response({ status: 412, message: 'id가 올바르지 않습니다.' }));
    }

    if (!cardUrl) {
      return res.json(response({ status: 412, message: '필수 파라미터가 없습니다.' }));
    }

    const file = await getFileById(id);
    if (!file) {
      return res.json(response({ status: 404, message: '존재하지않는 fileId.' }));
    }

    await updateFile({ id, cardUrl, part: parseInt(part, 10) });
    {
      const file = await getFileById(id);
      res.json(response({ data: file }));
    }
  } catch (e) {
    console.log(e);
    res.json(response({ status: 500, message: e.message }));
  }
};
const destroy: RequestResponseNext = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return res.json(response({ status: 412, message: 'id가 올바르지 않습니다.' }));
    }

    const file = await getFileById(id);
    if (!file) {
      return res.json({ message: 'file이 존재하지 않습니다' });
    }
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
