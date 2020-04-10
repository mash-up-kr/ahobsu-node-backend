import { Op } from 'sequelize';
import db from '../../models';
import Answer from '../../models/answer';

export const getAnswerByuserId = async ({ userId }: { userId: number }): Promise<Answer | null> => {
  return db.Answer.findOne({
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
  return db.Answer.findAll({
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

export const getAnswerByDateAnduserId = async ({ userId, date }: { userId: number; date: string }) => {
  return db.Answer.findOne({
    where: {
      userId,
      date,
    },
    include: [{ all: true }],
  });
};

export const createAnswer = async ({
  userId,
  missionId,
  imageUrl,
  fileId,
  content,
  date,
  setDate,
  no,
}: {
  userId: number;
  missionId: number;
  imageUrl: string;
  fileId: number;
  content: string;
  date: string;
  setDate: string;
  no: number;
}) => {
  return db.Answer.create({
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

export const getAnswerByIdAnduserId = async ({ id, userId }: { id: number; userId: number }) => {
  return db.Answer.findOne({
    where: { id, userId },
    include: [{ all: true }],
  });
};

export const updateAnswer = async ({
  id,
  userId,
  missionId,
  imageUrl,
  content,
}: {
  id: number;
  userId: number;
  missionId: number;
  imageUrl: string;
  content: string;
}) => {
  await db.Answer.update(
    { userId, missionId, imageUrl, content },
    {
      where: {
        id,
      },
    },
  );
};

export const deleteAnswer = async (id: number) => {
  return db.Answer.destroy({
    where: {
      id,
    },
  });
};

export const getRecentAnswers = async ({ userId, setDate }: { userId: number; setDate: string }): Promise<Answer[]> => {
  return db.Answer.findAll({
    where: {
      userId,
      setDate,
    },
    include: [{ all: true }],
  });
};

export const getAnswersByuserIdAndDateRange = async ({
  userId,
  dateGt,
}: {
  userId: number;
  dateGt: string;
}): Promise<Answer[]> => {
  return db.Answer.findAll({
    where: {
      userId,
      date: {
        [Op.gt]: dateGt,
      },
    },
    include: [{ all: true }],
  });
};
