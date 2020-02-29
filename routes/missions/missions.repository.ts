import moment from 'moment';
import { Op } from 'sequelize';
import db from '../../models';
import { Mission } from '../../models/mission';

export const getMissionById = async (id: number) => {
  return db.missions.findOne({ where: { id } });
};

export const setMissionsInUser = async ({ missions, id }: { id: number; missions: Mission[] }) => {
  const date = moment().format('YYYY-MM-DD');
  return db.users.update(
    { mission: JSON.stringify({ date, missions }) },
    {
      where: {
        id,
      },
    },
  );
};

export const createMission = async ({ title, isContent, isImage, cycle }: Mission) => {
  return db.missions.create({ title, isContent, isImage, cycle });
};

export const updateMission = async (id: number, { title, isContent, isImage, cycle }: Mission) => {
  db.missions.update(
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
  return db.users.update(
    { refreshDate: date, mission: JSON.stringify({ date, missions }) },
    {
      where: {
        id,
      },
    },
  );
};

export const deleteMission = async (id: number) => {
  return db.missions.destroy({
    where: {
      id,
    },
  });
};

export const getMissionsByNotInIdAndLimit = async ({ ids, limit = 3 }: { ids: number[]; limit?: number }) => {
  return db.missions.findAll({
    where: {
      id: {
        [Op.notIn]: ids,
      },
    },
    order: db.sequelize.random(),
    limit: limit,
  });
};
