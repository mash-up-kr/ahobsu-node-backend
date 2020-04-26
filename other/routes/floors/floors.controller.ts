
import { RequestResponseNext } from '..';
import response from '../../../lib/response';
import Floor from '../../../models/other/floor';

const get: RequestResponseNext = async (req, res) => {
  const floors = await Floor.findAll({});
  res.json(response({ data: { floors } }));

};

export default {
  get,
};
