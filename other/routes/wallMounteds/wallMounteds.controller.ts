
import { RequestResponseNext } from '..';
import response from '../../../lib/response';
import WallMounted from '../../../models/other/wallMounted';

const get: RequestResponseNext = async (req, res) => {
  const wallMounteds = await WallMounted.findAll({});
  res.json(response({ data: { wallMounteds } }));

};

export default {
  get,
};
