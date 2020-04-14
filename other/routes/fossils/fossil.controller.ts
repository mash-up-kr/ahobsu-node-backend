import { RequestResponseNext } from '..';
import response from '../../../lib/response';
import Fossil from '../../../models/other/fossil';

const get: RequestResponseNext = async (req, res) => {
  const fossils = await Fossil.findAll({});
  res.json(response({ data: { fossils } }));
};

export default {
  get,
};
