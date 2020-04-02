import { RequestResponseNext } from '..';
import response from '../../../lib/response';
import Citizen from '../../../models/other/citizen';

const get: RequestResponseNext = async (req, res) => {
  const citizens = await Citizen.findAll({});
  res.json(response({ data: { citizens } }));
};

export default {
  get,
};
