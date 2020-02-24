import db from '../../models';

// const getFileByDate = async date => {
//   return db.files.findOne({ where: { date } });
// };

export const getFileByPart = async (part: number) => {
  return db.files.findAll({
    where: {
      part,
    },
    order: db.sequelize.random(),
    limit: 1,
  });
};
export const getFileById = async (id: number) => {
  return db.files.findOne({ where: { id } });
};

export const createFile = async ({ cardUrl, part }: { cardUrl: string; part: number }) => {
  return db.files.create({ cardUrl, part });
};

export const updateFile = ({ id, cardUrl, part }: { id: number; cardUrl: string; part: number }) => {
  db.files.update(
    {
      cardUrl,
      part,
    },
    {
      where: {
        id,
      },
    },
  );
};

export const deleteFile = async (id: number) => {
  return db.files.destroy({
    where: {
      id,
    },
  });
};
