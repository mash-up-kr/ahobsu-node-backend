
import { RequestResponseNext } from '..';
import response from '../../../lib/response';
import Art from '../../../models/other/art';
const get: RequestResponseNext = async (req, res) => {
  const arts = await Art.findAll({})
  res.json(response({ data: { arts } }));
};

export default {
  get,
};
