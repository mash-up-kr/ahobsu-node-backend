import { RequestResponseNext } from '..';
import response from '../../../lib/response';
import Insect from '../../../models/other/insect';

const get: RequestResponseNext = async (req, res) => {
  const insects = await Insect.findAll({});
  res.json(response({ data: { insects } }));
};

export default {
  get,
};
