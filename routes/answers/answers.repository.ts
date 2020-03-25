import { Op } from 'sequelize';
import db from '../../models';
import Answer from '../../models/answer';

export const getAnswerByUserId = async ({ UserId }: { UserId: number }): Promise<Answer> => {
  return db.Answer.findOne({
    where: {
      UserId,
    },
    order: [['setDate', 'DESC']],
    include: [{ all: true }],
  });
};
export const getMonthAnswers = ({
  firstDate,
  lastDate,
  UserId,
}: {
  firstDate: string;
  lastDate: string;
  UserId: number;
}) => {
  return db.Answer.findAll({
    where: {
      UserId,
      setDate: {
        [Op.gte]: firstDate,
        [Op.lte]: lastDate,
      },
    },
    order: [['no', 'DESC']],
    include: [{ all: true }],
  });
};

export const getAnswerByDateAndUserId = async ({ UserId, date }: { UserId: number; date: string }) => {
  return db.Answer.findOne({
    where: {
      UserId,
      date,
    },
    include: [{ all: true }],
  });
};

export const createAnswer = async ({
  UserId,
  MissionId,
  imageUrl,
  FileId,
  content,
  date,
  setDate,
  no,
}: {
  UserId: number;
  MissionId: number;
  imageUrl: string;
  FileId: string;
  content: string;
  date: string;
  setDate: string;
  no: number;
}) => {
  return db.Answer.create({
    UserId,
    MissionId,
    imageUrl,
    FileId,
    content,
    date,
    setDate,
    no,
  });
};

export const getAnswerByIdAndUserId = async ({ id, UserId }: { id: number; UserId: number }) => {
  return db.Answer.findOne({
    where: { id, UserId },
    include: [{ all: true }],
  });
};

export const updateAnswer = async ({
  id,
  UserId,
  MissionId,
  imageUrl,
  content,
}: {
  id: number;
  UserId: number;
  MissionId: number;
  imageUrl: string;
  content: string;
}) => {
  await db.Answer.update(
    { UserId, MissionId, imageUrl, content },
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

export const getRecentAnswers = async ({ UserId, setDate }: { UserId: number; setDate: string }): Promise<Answer[]> => {
  return db.Answer.findAll({
    where: {
      UserId,
      setDate,
    },
    include: [{ all: true }],
  });
};

export const getAnswersByUserIdAndDateRange = async ({
  UserId,
  dateGt,
}: {
  UserId: number;
  dateGt: string;
}): Promise<Answer[]> => {
  return db.Answer.findAll({
    where: {
      UserId,
      date: {
        [Op.gt]: dateGt,
      },
    },
    include: [{ all: true }],
  });
};
