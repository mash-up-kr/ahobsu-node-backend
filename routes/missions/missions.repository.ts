import moment from 'moment';
import { Op } from 'sequelize';
import db from '../../models';
import { Answers } from '../../models/answer';
import { Mission } from '../../models/mission';

export const getMissionById = async (id: number) => {
  return db.missions.findOne({ where: { id } });
};

export const getOldMission = (user: { mission: string }) => {
  const { mission } = user;
  return mission && JSON.parse(mission);
};

export const getNewMission = async (userId: number) => {
  const date = moment().format('YYYY-MM-DD');
  const oneYearAgo = moment()
    .add(-1, 'years')
    .format('YYYY-MM-DD');

  const oneYearData = await db.answers.findAll({
    where: {
      userId,
      date: {
        [Op.gt]: oneYearAgo,
      },
    },
    include: [
      {
        model: db.missions,
      },
    ],
  });
  const ids = [] as number[];
  oneYearData.forEach((data: Answers) => {
    if (
      !!data &&
      !!data.date &&
      data.mission &&
      data.mission.cycle &&
      data.mission.id &&
      moment(data.date)
        .add(data.mission.cycle, 'days')
        .format('YYYY-MM-DD') >= date
    ) {
      ids.push(data.mission.id);
    }
  });

  const missions = db.missions.findAll({
    where: {
      id: {
        [Op.notIn]: ids,
      },
    },
    order: db.sequelize.random(),
    limit: 3,
  });
  return missions;
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
