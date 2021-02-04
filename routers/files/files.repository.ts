import db, { sequelize } from '../../models';

export const getFileByPart = async (part: number) => {
  return db.File.findOne({
    where: {
      part,
    },
    order: sequelize.random(),
    limit: 1,
  });
};

export const getFileById = async (id: number) => {
  return db.File.findOne({ where: { id } });
};

export const createFile = async ({ cardUrl, part }: { cardUrl: string; part: number }) => {
  return db.File.create({ cardUrl, part });
};

export const updateFile = ({ id, cardUrl, part }: { id: number; cardUrl: string; part: number }) => {
  db.File.update(
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


export const updateSvgFile = ({ id, cardSvgUrl, part }: { id: number; cardSvgUrl: string; part: number }) => {
  db.File.update(
    {
      cardSvgUrl,
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
  return db.File.destroy({
    where: {
      id,
    },
  });
};
