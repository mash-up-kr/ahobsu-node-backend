import db from '../../models';

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

export const getUsers = async () => {
  return db.users.findAll();
};

export const updateUser = async (
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

export const resetRefeshDateById = async (id: number) => {
  return db.users.update(
    { refreshDate: null },
    {
      where: {
        id,
      },
    },
  );
};

export const deleteUser = async (id: number) => {
  return db.users.destroy({
    where: {
      id,
    },
  });
};
