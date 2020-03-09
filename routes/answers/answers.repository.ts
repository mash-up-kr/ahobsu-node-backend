import { Op } from 'sequelize';
import db from '../../models';
import { Answers } from '../../models/answer';

export const getAnswerByUserId = async ({ userId }: { userId: number }): Promise<Answers> => {
  return db.answers.findOne({
    where: {
      userId,
    },
    order: [['setDate', 'DESC']],
    include: [{ all: true }],
  });
};
export const getMonthAnswers = ({
  firstDate,
  lastDate,
  userId,
}: {
  firstDate: string;
  lastDate: string;
  userId: number;
}) => {
  return db.answers.findAll({
    where: {
      userId,
      setDate: {
        [Op.gte]: firstDate,
        [Op.lte]: lastDate,
      },
    },
    order: [['no', 'DESC']],
    include: [{ all: true }],
  });
};

export const getAnswerByDateAndUserId = async ({ userId, date }: { userId: number; date: string }) => {
  return db.answers.findOne({
    where: {
      userId,
      date,
    },
    include: [{ all: true }],
  });
};

export const createAnswer = async ({ userId, missionId, imageUrl, fileId, content, date, setDate, no }: Answers) => {
  return db.answers.create({
    userId,
    missionId,
    imageUrl,
    fileId,
    content,
    date,
    setDate,
    no,
  });
};

export const getAnswerByIdAndUserId = async ({ id, userId }: { id: number; userId: number }) => {
  return db.answers.findOne({
    where: { id, userId },
    include: [{ all: true }],
  });
};

export const updateAnswer = async ({ id, userId, missionId, imageUrl, content }: Answers) => {
  await db.answers.update(
    { userId, missionId, imageUrl, content },
    {
      where: {
        id,
      },
    },
  );
};

export const deleteAnswer = async (id: number) => {
  return db.answers.destroy({
    where: {
      id,
    },
  });
};

export const getRecentAnswers = async ({
  userId,
  setDate,
}: {
  userId: number;
  setDate: string;
}): Promise<Answers[]> => {
  return db.answers.findAll({
    where: {
      userId,
      setDate,
    },
    include: [{ all: true }],
  });
};

export const getAnswersByUserIdAndDateRange = async ({
  userId,
  dateGt,
}: {
  userId: number;
  dateGt: string;
}): Promise<Answers[]> => {
  return db.answers.findAll({
    where: {
      userId,
      date: {
        [Op.gt]: dateGt,
      },
    },
    include: [{ all: true }],
  });
};
