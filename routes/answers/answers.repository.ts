import { Op } from 'sequelize';
import db from '../../models';
import { Answers } from '../../models/answer';

export const getAnswerByUserId = async ({ userId }: { userId: number }): Promise<Answers> => {
  return db.answers.findOne({
    where: {
      userId,
    },
    order: [['setDate', 'DESC']],
    include: [
      {
        model: db.missions,
      },
    ],
  });
};
export const getMonthAnswers = ({
  firstDay,
  lastDay,
  userId,
}: {
  firstDay: string;
  lastDay: string;
  userId: number;
}) => {
  return db.answers.findAll({
    where: {
      userId,
      setDate: {
        [Op.gt]: firstDay,
        [Op.lt]: lastDay,
      },
    },
    group: 'setDate',
    include: [
      {
        model: db.missions,
      },
    ],
  });
};

export const getAnswerByDateAndUserId = async ({ userId, date }: { userId: number; date: string }) => {
  return db.answers.findOne({
    where: {
      userId,
      date,
    },
    include: [
      {
        model: db.missions,
      },
    ],
  });
};

export const createAnswer = async ({ userId, missionId, imageUrl, cardUrl, content, date, setDate }: Answers) => {
  return db.answers.create({
    userId,
    missionId,
    imageUrl,
    cardUrl,
    content,
    date,
    setDate,
  });
};

export const getAnswerById = async (id: number) => {
  return db.answers.findOne({
    where: { id },
    include: [
      {
        model: db.missions,
      },
    ],
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
  });
};
