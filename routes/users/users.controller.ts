import db from '../../models';
import response from '../../lib/response';
import { RequestResponseNext } from '..';

const users: RequestResponseNext = async (req, res, next) => {
  try {
    const users = await getUsers();
    res.json(response({ data: users }));
  } catch (e) {
    console.log(e);
    return res.json(response({ status: 500, message: e.message }));
  }
};
const my: RequestResponseNext = async (req, res) => {
  try {
    let userId = 0;
    if (req.user) {
      const { id } = req.user;
      userId = id;
    }
    const user = await getUserById(userId);
    if (!user) {
      return res.json(response({ status: 404, message: '유저가 존재하지 없습니다.' }));
    }
    res.json(response({ data: user }));
  } catch (e) {
    console.log(e);
    return res.json(response({ status: 500, message: e.message }));
  }
};
const user: RequestResponseNext = async (req, res) => {
  try {
    const { id } = req.params;
    if (isNaN(parseInt(id, 10))) {
      return res.json(response({ status: 412, message: 'id가 올바르지 않습니다.' }));
    }
    const user = await getUserById(parseInt(id, 10));
    if (!user) {
      return res.json(response({ status: 404, message: '유저가 존재하지 없습니다.' }));
    }
    res.json(response({ data: user }));
  } catch (e) {
    console.log(e);
    return res.json(response({ status: 500, message: e.message }));
  }
};
const update: RequestResponseNext = async (req, res) => {
  try {
    let userId = 0;
    if (req.user) {
      const { id } = req.user;
      userId = id;
    }
    if (isNaN(userId)) {
      return res.json(response({ status: 412, message: 'id가 올바르지 않습니다.' }));
    }
    if (isRequired(req.body)) {
      return res.json(response({ status: 412, message: '필수 파라이터가 없습니다.' }));
    }
    const user = await getUserById(userId);
    if (!user) {
      return res.json(response({ status: 404, message: '유저가 존재하지 없습니다.' }));
    }
    await updateUser(userId, req.body);
    {
      const user = await getUserById(userId);
      res.json(response({ data: user }));
    }
  } catch (e) {
    console.log(e);
    res.json(response({ status: 500, message: e.message }));
  }
};
const refresh: RequestResponseNext = async (req, res) => {
  try {
    let userId = 0;
    if (req.user) {
      const { id } = req.user;
      userId = id;
    }
    // const refreshDate = null;
    if (isNaN(userId)) {
      return res.json(response({ status: 412, message: 'id가 올바르지 않습니다.' }));
    }
    const user = await getUserById(userId);
    if (!user) {
      return res.json(response({ status: 404, message: '유저가 존재하지 없습니다.' }));
    }
    await resetRefeshDateById(userId);
    {
      const user = await getUserById(userId);
      res.json(response({ data: user }));
    }
  } catch (e) {
    console.log(e);
    res.json(response({ status: 500, message: e.message }));
  }
};
const destroy: RequestResponseNext = async (req, res, next) => {
  try {
    let userId = 0;
    if (req.user) {
      const { id } = req.user;
      userId = id;
    }
    if (isNaN(userId)) {
      return res.json(response({ status: 412, message: 'id가 올바르지 않습니다.' }));
    }
    const user = await getUserById(userId);
    if (!user) {
      return res.json(response({ status: 404, message: '유저가 존재하지 없습니다.' }));
    }
    await deleteUser(userId);
    res.json(response({ message: '유저를 삭제 했습니다.' }));
  } catch (e) {
    console.log(e);
    res.json(response({ status: 500, message: e.message }));
  }
};
export default {
  users,
  my,
  user,
  update,
  refresh,
  destroy,
};

export const getUserById = async (id: number) => {
  return db.users.findOne({
    where: {
      id,
    },
  });
};

export const getUserBySnsIdAndSnsType = async ({ snsId, snsType }: { snsId: string; snsType: string }) => {
  return db.users.findOne({ where: { snsId, snsType } });
};

export const createUser = async ({ snsId, snsType, email }: { snsId: string; snsType: string; email: string }) => {
  return db.users.create({ snsId, snsType, email });
};

const getUsers = async () => {
  return db.users.findAll();
};

const isRequired = ({ name, birthday, gender }: { name: string; birthday: string; gender: string }) => {
  return !name || !birthday || !gender;
};

const updateUser = async (
  id: number,
  { name, birthday, gender }: { name: string; birthday: string; gender: string },
) => {
  return db.users.update(
    { name, birthday, gender },
    {
      where: {
        id,
      },
    },
  );
};

const resetRefeshDateById = async (id: number) => {
  return db.users.update(
    { refreshDate: null },
    {
      where: {
        id,
      },
    },
  );
};

const deleteUser = async (id: number) => {
  return db.users.destroy({
    where: {
      id,
    },
  });
};
