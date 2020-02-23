import moment from 'moment';
import { Op } from 'sequelize';
import { RequestResponseNext } from '..';
import response from '../../lib/response';
import db from '../../models';
import { Answers } from '../../models/answer';
import { Mission } from '../../models/mission';
import { getUserById } from '../users/users.ctrl';

const missoins: RequestResponseNext = async (req, res) => {
  try {
    let userId = 0;
    if (req.user) {
      const { id } = req.user;
      userId = id;
    }
    const user = await getUserById(userId);
    if (!user) {
      return res.json(response({ status: 400, message: '유저가 존재하지 없습니다.' }));
    }

    const date = moment().format('YYYY-MM-DD');
    const oldMission = getOldMission(user);
    const refresh = !user.refreshDate || (!!user.refreshDate && user.refreshDate < date);

    if (!!oldMission && oldMission.date === date && oldMission.missions.length > 0) {
      return res.json(response({ data: { refresh, missions: oldMission.missions } }));
    }
    const missions = await getNewMission(userId);
    await setMissionsInUser({ missions, id: userId });
    res.json(response({ data: { refresh, missions } }));
  } catch (e) {
    console.log(e);
    res.json(response({ status: 500, message: e.message }));
  }
};

const refresh: RequestResponseNext = async (req, res) => {
  try {
    let userId = 0;
    if (req.user) {
      const { id } = req.user;
      userId = id;
    }
    const user = await getUserById(userId);
    if (!user) {
      return res.json(response({ status: 404, message: '유저가 존재하지 없습니다.' }));
    }
    const date = moment().format('YYYY-MM-DD');
    if (!!user.refreshDate && user.refreshDate === date) {
      return res.json(response({ status: 400, message: '갱신 횟수가 모자랍니다.' }));
    }
    const missions = await getNewMission(userId);
    await setMissionsAndRefeshDateInUser({ missions, id: userId });
    res.json(response({ data: { refresh: false, missions } }));
  } catch (e) {
    console.log(e);
    res.json(response({ status: 500, message: e.message }));
  }
};

const mission: RequestResponseNext = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) {
    return res.json(response({ status: 412, message: 'id가 올바르지 않습니다.' }));
  }
  try {
    const mission = await getMissionById(id);
    res.json(response({ data: mission }));
  } catch (e) {
    console.log(e);
    res.json(response({ status: 500, message: e.message }));
  }
};

const create: RequestResponseNext = async (req, res) => {
  try {
    if (isRequired(req.body)) {
      return res.json(response({ status: 412, message: '필수 파라이터가 없습니다.' }));
    }
    const missions = await createMission(req.body);
    res.json(response({ status: 201, data: missions }));
  } catch (e) {
    console.log(e);
    res.json(response({ status: 500, message: e.message }));
  }
};

const update: RequestResponseNext = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return res.json(response({ status: 412, message: 'id가 올바르지 않습니다.' }));
    }
    if (isRequired(req.body)) {
      return res.json(response({ status: 412, message: '필수 파라이터가 없습니다.' }));
    }
    const mission = await getMissionById(id);
    if (!mission) {
      return res.json(response({ status: 400, message: '유효하지 않은 mission id 입니다.' }));
    }

    await updateMission(id, req.body);
    {
      const mission = await getMissionById(id);
      res.json(response({ data: mission }));
    }
  } catch (e) {
    console.log(e);
    res.json(response({ status: 500, message: e.message }));
  }
};

const destroy: RequestResponseNext = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return res.json(response({ status: 412, message: 'id가 올바르지 않습니다.' }));
    }
    const mission = await getMissionById(id);
    if (!mission) {
      return res.json({ message: '유효하지 않은 mission id 입니다.' });
    }

    await deleteMission(id);
    res.json(response({ status: 204, message: '문제를 삭제 했습니다.' }));
  } catch (e) {
    console.log(e);
    res.json(response({ status: 500, message: e.message }));
  }
};

export default { missoins, refresh, mission, create, update, destroy };

export const getMissionById = async (id: number) => {
  return db.missions.findOne({ where: { id } });
};

const getOldMission = (user: { mission: string }) => {
  const { mission } = user;
  return mission && JSON.parse(mission);
};

const getNewMission = async (userId: number) => {
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

const setMissionsInUser = async ({ missions, id }: { id: number; missions: Mission[] }) => {
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

const isRequired = ({ title, isContent, isImage, cycle }: Mission) => {
  return !title || (!isContent && isContent !== false) || (!isImage && isImage !== false) || !cycle;
};

const createMission = async ({ title, isContent, isImage, cycle }: Mission) => {
  return db.missions.create({ title, isContent, isImage, cycle });
};

const updateMission = async (id: number, { title, isContent, isImage, cycle }: Mission) => {
  db.missions.update(
    { title, isContent, isImage, cycle },
    {
      where: {
        id,
      },
    },
  );
};

const setMissionsAndRefeshDateInUser = async ({ id, missions }: { id: number; missions: Mission[] }) => {
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

const deleteMission = async (id: number) => {
  return db.missions.destroy({
    where: {
      id,
    },
  });
};
