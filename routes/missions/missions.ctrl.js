const moment = require('moment');
const { Op } = require('sequelize');

const db = require('../../models');
const response = require('../../lib/response');
const { getUserById } = require('../users/users.ctrl');

const missoins = async (req, res) => {
  try {
    const { id } = req.user;
    const user = await getUserById(id);
    if (!user) {
      return res.json(response({ status: 400, message: '유저가 존재하지 없습니다.' }));
    }

    const date = moment().format('YYYY-MM-DD');
    const oldMission = getOldMission(user);
    const refresh = !user.refreshDate || (!!user.refreshDate && user.refreshDate < date);

    if (!!oldMission && oldMission.date === date && oldMission.missions.length > 0) {
      console.log(11111, oldMission.missions);
      return res.json(response({ data: { refresh, missions: oldMission.missions } }));
    }
    const missions = await getNewMission(id);
    await setMissionsInUser({ missions, id });
    res.json(response({ data: { refresh, missions } }));
  } catch (e) {
    console.log(e);
    res.json(response({ status: 500, message: e.message }));
  }
};

const refresh = async (req, res) => {
  try {
    const { id } = req.user;
    const user = await getUserById(id);
    if (!user) {
      return res.json(response({ status: 404, message: '유저가 존재하지 없습니다.' }));
    }
    const date = moment().format('YYYY-MM-DD');
    if (!!user.refreshDate && user.refreshDate === date) {
      return res.json(response({ status: 400, message: '갱신 횟수가 모자랍니다.' }));
    }
    const missions = await getNewMission(id);
    await setMissionsAndRefeshDateInUser({ missions, id });
    res.json(response({ data: { refresh: false, missions } }));
  } catch (e) {
    console.log(e);
    res.json(response({ status: 500, message: e.message }));
  }
};

const mission = async (req, res) => {
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

const create = async (req, res) => {
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

const update = async (req, res) => {
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

const destroy = async (req, res) => {
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

const getMissionById = async id => {
  return db.missions.findOne({ where: { id } });
};

module.exports = { missoins, refresh, mission, create, update, destroy, getMissionById };

const getOldMission = user => {
  const { mission } = user;
  return mission && JSON.parse(mission);
};

const getNewMission = async userId => {
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
  const ids = [];
  oneYearData.forEach(data => {
    if (
      moment(data.date)
        .add(data.cycle, 'days')
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

const setMissionsInUser = async ({ missions, id }) => {
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

const isRequired = ({ title, isContent, isImage, cycle }) => {
  return !title || (!isContent && isContent !== false) || (!isImage && isImage !== false) || !cycle;
};

const createMission = async ({ title, isContent, isImage, cycle }) => {
  return db.missions.create({ title, isContent, isImage, cycle });
};

const updateMission = async (id, { title, isContent, isImage, cycle }) => {
  db.missions.update(
    { title, isContent, isImage, cycle },
    {
      where: {
        id,
      },
    },
  );
};

const setMissionsAndRefeshDateInUser = async ({ id, missions }) => {
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

const deleteMission = async id => {
  return db.missions.destroy({
    where: {
      id,
    },
  });
};
