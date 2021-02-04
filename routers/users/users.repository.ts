import db from '../../models';

export const getUserById = async (id: number) => {
  return db.User.findOne({
    where: {
      id,
    },
  });
};

export const getUserBySnsIdAndSnsType = async ({ snsId, snsType }: { snsId: string; snsType: string }) => {
  return db.User.findOne({ where: { snsId, snsType } });
};

export const createUser = async ({ snsId, snsType, email }: { snsId: string; snsType: string; email: string }) => {
  return db.User.create({ snsId, snsType, email });
};

export const getUsers = async () => {
  return db.User.findAll();
};

export const updateUser = async (
  id: number,
  { name, birthday, gender }: { name: string; birthday: string; gender: string },
) => {
  return db.User.update(
    { name: name.slice(0, 8), birthday, gender },
    {
      where: {
        id,
      },
    },
  );
};

export const resetRefeshDateById = async (id: number) => {
  return db.User.update(
    { refreshDate: null },
    {
      where: {
        id,
      },
    },
  );
};

export const deleteUser = async (id: number) => {
  return db.User.destroy({
    where: {
      id,
    },
  });
};
