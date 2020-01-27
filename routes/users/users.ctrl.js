const db = require('../../models');
const response = require('../../lib/response');

const users = async (req, res, next) => {
  try {
    const users = await db.users.findAll();
    res.json(response({ data: users }));
  } catch (e) {
    console.log(e);
    return res.json(response({ status: 500, message: e.message }));
  }
};
const my = async (req, res, next) => {
  const { id } = req.user;
  try {
    const user = await db.users.findOne({ where: { id } });
    if (!user) {
      return res.json(response({ status: 404, message: '유저가 존재하지 없습니다.' }));
    }
    res.json(response({ data: user }));
  } catch (e) {
    console.log(e);
    return res.json(response({ status: 500, message: e.message }));
  }
};
const user = async (req, res, next) => {
  const { id } = req.params;
  if (isNaN(id)) {
    return res.json(response({ status: 412, message: 'id가 올바르지 않습니다.' }));
  }
  try {
    const user = await db.users.findOne({ where: { id } });
    if (!user) {
      return res.json(response({ status: 404, message: '유저가 존재하지 없습니다.' }));
    }
    res.json(response({ data: user }));
  } catch (e) {
    console.log(e);
    return res.json(response({ status: 500, message: e.message }));
  }
};

const update = async (req, res, next) => {
  const { id } = req.user;
  if (isNaN(id)) {
    return res.json(response({ status: 412, message: 'id가 올바르지 않습니다.' }));
  }
  const { name, birthday, email, gender } = req.body;
  if (!name || !birthday || !email || !gender) {
    return res.json(response({ status: 412, message: '필수 파라이터가 없습니다.' }));
  }
  try {
    const user = await db.users.findOne({ where: { id } });
    if (!user) {
      return res.json(response({ status: 404, message: '유저가 존재하지 없습니다.' }));
    }
    await db.users.update(
      { name, birthday, email, gender },
      {
        where: {
          id,
        },
      },
    );
    const newUser = await db.users.findOne({ where: { id } });
    res.json(response({ data: newUser }));
  } catch (e) {
    console.log(e);
    res.json(response({ status: 500, message: e.message }));
  }
};

const refresh = async (req, res, next) => {
  const { id } = req.user;
  const refreshDate = null;
  if (isNaN(id)) {
    return res.json(response({ status: 412, message: 'id가 올바르지 않습니다.' }));
  }
  try {
    const user = await db.users.findOne({ where: { id } });
    if (!user) {
      return res.json(response({ status: 404, message: '유저가 존재하지 없습니다.' }));
    }
    await db.users.update(
      { refreshDate },
      {
        where: {
          id,
        },
      },
    );
    const newUser = await db.users.findOne({ where: { id } });
    res.json(response({ data: newUser }));
  } catch (e) {
    console.log(e);
    res.json(response({ status: 500, message: e.message }));
  }
};

const destroy = async (req, res, next) => {
  const { id } = req.user;
  if (isNaN(id)) {
    return res.json(response({ status: 412, message: 'id가 올바르지 않습니다.' }));
  }
  try {
    const user = await db.users.findOne({
      where: {
        id,
      },
    });
    if (!user) {
      return res.json(response({ status: 404, message: '유저가 존재하지 없습니다.' }));
    }
    await db.users.destroy({
      where: {
        id,
      },
    });
    res.json(response({ message: '유저를 삭제 했습니다.' }));
  } catch (e) {
    console.log(e);
    res.json(response({ status: 500, message: e.message }));
  }
};

module.exports = { users, my, user, update, refresh, destroy };
