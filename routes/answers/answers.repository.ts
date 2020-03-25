import { Op } from 'sequelize';
import db from '../../models';
import Answer from '../../models/answer';

export const getAnswerByUserId = async ({ userId }: { userId: number }): Promise<Answer> => {
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

export const getAnswerByDateAndUserId = async ({ userId, date }: { userId: number; date: string }) => {
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
  MissionId,
  imageUrl,
  FileId,
  content,
  date,
  setDate,
  no,
}: {
  userId: number;
  MissionId: number;
  imageUrl: string;
  FileId: string;
  content: string;
  date: string;
  setDate: string;
  no: number;
}) => {
  return db.Answer.create({
    userId,
    MissionId,
    imageUrl,
    FileId,
    content,
    date,
    setDate,
    no,
  });
};

export const getAnswerByIdAndUserId = async ({ id, userId }: { id: number; userId: number }) => {
  return db.Answer.findOne({
    where: { id, userId },
    include: [{ all: true }],
  });
};

export const updateAnswer = async ({
  id,
  userId,
  MissionId,
  imageUrl,
  content,
}: {
  id: number;
  userId: number;
  MissionId: number;
  imageUrl: string;
  content: string;
}) => {
  await db.Answer.update(
    { userId, MissionId, imageUrl, content },
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

export const getAnswersByUserIdAndDateRange = async ({
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
