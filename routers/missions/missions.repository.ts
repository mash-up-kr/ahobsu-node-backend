import moment from 'moment';
import { Op } from 'sequelize';
import db, { sequelize } from '../../models';
import Mission from '../../models/mission';

export const getMissionById = async (id: number): Promise<Mission | null> => {
  return Mission.findOne({ where: { id } });
};

export const setMissionsInUser = async ({ missions, id }: { id: number; missions: Mission[] }) => {
  const date = moment().format('YYYY-MM-DD');
  return db.User.update(
    { mission: JSON.stringify({ date, missions }) },
    {
      where: {
        id,
      },
    },
  );
};

export const createMission = async ({ title, isContent, isImage, cycle }: Mission) => {
  return db.Mission.create({ title, isContent, isImage, cycle });
};

export const updateMission = async (id: number, { title, isContent, isImage, cycle }: Mission) => {
  return db.Mission.update(
    { title, isContent, isImage, cycle },
    {
      where: {
        id,
      },
    },
  );
};

export const setMissionsAndRefeshDateInUser = async ({ id, missions }: { id: number; missions: Mission[] }) => {
  const date = moment().format('YYYY-MM-DD');
  return db.User.update(
    { refreshDate: date, mission: JSON.stringify({ date, missions }) },
    {
      where: {
        id,
      },
    },
  );
};

export const deleteMission = async (id: number) => {
  return db.Mission.destroy({
    where: {
      id,
    },
  });
};

export const getMissionsByNotInIdAndLimit = async ({ ids, limit = 3 }: { ids: number[]; limit?: number }) => {
  return db.Mission.findAll({
    where: {
      id: {
        [Op.notIn]: ids,
      },
    },
    order: sequelize.random(),
    limit: limit,
  });
};

export const getTempMission = async () => {
  return db.Mission.findAll({
    where: {
      id: {
        [Op.in]: [1, 2, 10],
      },
    },
  });
};
