import { RequestResponseNext } from '..';
import response from '../../../lib/response';
import Citizen from '../../../models/other/citizen';

const get: RequestResponseNext = async (req, res) => {
  const { type } = req.query;
  const citizens = type
    ? await Citizen.findAll({ where: { type } })
    : await Citizen.findAll({ order: [['type', 'ASC']] });
  res.json(response({ data: { citizens } }));
};

export default {
  get,
};
