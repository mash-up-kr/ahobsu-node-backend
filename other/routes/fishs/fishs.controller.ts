import { RequestResponseNext } from '..';
import response from '../../../lib/response';
import Fish from '../../../models/other/fish';

const get: RequestResponseNext = async (req, res) => {
  const fishs = await Fish.findAll({});
  res.json(response({ data: { fishs } }));
};

export default {
  get,
};
