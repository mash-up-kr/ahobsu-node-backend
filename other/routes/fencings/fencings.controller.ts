
import { RequestResponseNext } from '..';
import response from '../../../lib/response';
import Fencing from '../../../models/other/fencing';

const get: RequestResponseNext = async (req, res) => {
  const fencings = await Fencing.findAll({});
  res.json(response({ data: { fencings } }));

};

export default {
  get,
};
