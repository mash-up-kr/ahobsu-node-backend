const db = require('../../models');
const response = require('../../lib/response');

const date = async (req, res, next) => {
  const { date } = req.params;
  try {
    const file = await getFileByDate(date);
    res.json(response({ data: file }));
  } catch (e) {
    console.log(e);
    res.json(response({ status: 500, message: e.message }));
  }
};

const create = async (req, res, next) => {
  try {
    const { date, file: cardUrl } = req.body;

    const file = await getFileByDate(date);
    if (file) {
      return res.json(response({ status: 400, message: '해당날짜에 이미지가 이미 있습니다.' }));
    }

    if (isRequired({ date, cardUrl })) {
      return res.json(response({ status: 412, message: '필수 파라미터가 없습니다.' }));
    }
    {
      const file = await createFile({ cardUrl, date });
      res.json(response({ status: 201, data: file }));
    }
  } catch (e) {
    console.log(e);
    res.json(response({ status: 500, message: e.message }));
  }
};

const update = async (req, res, next) => {
  try {
    const { file: cardUrl } = req.body;
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

    await updateFile({ id, cardUrl });
    {
      const file = await getFileById(id);
      res.json(response({ data: file }));
    }
  } catch (e) {
    console.log(e);
    res.json(response({ status: 500, message: e.message }));
  }
};

const destroy = async (req, res, next) => {
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

const getFileByDate = async date => {
  return db.files.findOne({ where: { date } });
};

const getFileById = async id => {
  return db.files.findOne({ where: { id } });
};

module.exports = {
  date,
  create,
  update,
  destroy,
  getFileByDate,
  getFileById,
};

const isRequired = ({ cardUrl, date }) => {
  return !cardUrl || !date;
};

const createFile = async ({ cardUrl, date }) => {
  return db.files.create({ cardUrl, date });
};

const updateFile = ({ id, cardUrl }) => {
  db.files.update(
    {
      cardUrl,
    },
    {
      where: {
        id,
      },
    },
  );
};

const deleteFile = async id => {
  return db.files.destroy({
    where: {
      id,
    },
  });
};
