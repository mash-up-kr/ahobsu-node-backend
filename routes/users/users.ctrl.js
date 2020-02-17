const db = require('../../models');
const response = require('../../lib/response');

const users = async (_, res) => {
  try {
    const users = await getUsers();
    res.json(response({ data: users }));
  } catch (e) {
    console.log(e);
    return res.json(response({ status: 500, message: e.message }));
  }
};
const my = async (req, res) => {
  try {
    const { id } = req.user;
    const user = await getUserById(id);
    if (!user) {
      return res.json(response({ status: 404, message: '유저가 존재하지 없습니다.' }));
    }
    res.json(response({ data: user }));
  } catch (e) {
    console.log(e);
    return res.json(response({ status: 500, message: e.message }));
  }
};
const user = async (req, res) => {
  try {
    const { id } = req.params;
    if (isNaN(id)) {
      return res.json(response({ status: 412, message: 'id가 올바르지 않습니다.' }));
    }
    const user = await getUserById(id);
    if (!user) {
      return res.json(response({ status: 404, message: '유저가 존재하지 없습니다.' }));
    }
    res.json(response({ data: user }));
  } catch (e) {
    console.log(e);
    return res.json(response({ status: 500, message: e.message }));
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.user;
    if (isNaN(id)) {
      return res.json(response({ status: 412, message: 'id가 올바르지 않습니다.' }));
    }
    if (isRequired(req.body)) {
      return res.json(response({ status: 412, message: '필수 파라이터가 없습니다.' }));
    }
    const user = await getUserById(id);
    if (!user) {
      return res.json(response({ status: 404, message: '유저가 존재하지 없습니다.' }));
    }
    await updateUser(id, req.body);
    {
      const user = await getUserById(id);
      res.json(response({ data: user }));
    }
  } catch (e) {
    console.log(e);
    res.json(response({ status: 500, message: e.message }));
  }
};

const refresh = async (req, res) => {
  try {
    const { id } = req.user;
    // const refreshDate = null;
    if (isNaN(id)) {
      return res.json(response({ status: 412, message: 'id가 올바르지 않습니다.' }));
    }
    const user = await getUserById(id);
    if (!user) {
      return res.json(response({ status: 404, message: '유저가 존재하지 없습니다.' }));
    }
    await resetRefeshDateById(id);
    {
      const user = await getUserById(id);
      res.json(response({ data: user }));
    }
  } catch (e) {
    console.log(e);
    res.json(response({ status: 500, message: e.message }));
  }
};

const destroy = async (req, res, next) => {
  try {
    const { id } = req.user;
    if (isNaN(id)) {
      return res.json(response({ status: 412, message: 'id가 올바르지 않습니다.' }));
    }
    const user = await getUserById(id);
    if (!user) {
      return res.json(response({ status: 404, message: '유저가 존재하지 없습니다.' }));
    }
    await deleteUser(id);
    res.json(response({ message: '유저를 삭제 했습니다.' }));
  } catch (e) {
    console.log(e);
    res.json(response({ status: 500, message: e.message }));
  }
};

const getUserById = async id => {
  return db.users.findOne({
    where: {
      id,
    },
  });
};

const getUserBySnsIdAndSnsType = async ({ snsId, snsType }) => {
  return db.users.findOne({ where: { snsId, snsType } });
};

const createUser = async ({ snsId, snsType, email }) => {
  return db.users.create({ snsId, snsType, email });
};

module.exports = { users, my, user, update, refresh, destroy, getUserById, getUserBySnsIdAndSnsType, createUser };

const getUsers = async () => {
  return db.users.findAll();
};

const isRequired = ({ name, birthday, gender }) => {
  return !name || !birthday || !gender;
};

const updateUser = async (id, { name, birthday, gender }) => {
  return db.users.update(
    { name, birthday, gender },
    {
      where: {
        id,
      },
    },
  );
};

const resetRefeshDateById = async id => {
  return db.users.update(
    { refreshDate: null },
    {
      where: {
        id,
      },
    },
  );
};

const deleteUser = async id => {
  return db.users.destroy({
    where: {
      id,
    },
  });
};
