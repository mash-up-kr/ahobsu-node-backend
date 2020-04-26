
import { RequestResponseNext } from '..';
import response from '../../../lib/response';
import Tool from '../../../models/other/tool';

const get: RequestResponseNext = async (req, res) => {
  const tools = await Tool.findAll({});
  res.json(response({ data: { tools } }));

};

export default {
  get,
};
