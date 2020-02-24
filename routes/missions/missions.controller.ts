import moment from 'moment';
import { RequestResponseNext } from '..';
import response from '../../lib/response';

import { getUserById } from '../users/users.controller';
import {
  getNewMission,
  setMissionsAndRefeshDateInUser,
  getMissionById,
  getOldMission,
  setMissionsInUser,
  createMission,
  updateMission,
  deleteMission,
} from './missions.repository';
import { isRequired } from './missions.service';

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
