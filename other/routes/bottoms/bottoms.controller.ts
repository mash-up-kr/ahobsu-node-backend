
import { RequestResponseNext } from '..';
import response from '../../../lib/response';
import Bottom from '../../../models/other/bottom';

const get: RequestResponseNext = async (req, res) => {
  const bottoms = await Bottom.findAll({});
  res.json(response({ data: { bottoms } }));

};

export default {
  get,
};
