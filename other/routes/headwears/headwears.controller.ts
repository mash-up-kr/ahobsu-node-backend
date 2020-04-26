
import { RequestResponseNext } from '..';
import response from '../../../lib/response';
import Headwear from '../../../models/other/headwear';

const get: RequestResponseNext = async (req, res) => {
  const headwears = await Headwear.findAll({});
  res.json(response({ data: { headwears } }));

};

export default {
  get,
};
