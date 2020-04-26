
import { RequestResponseNext } from '..';
import response from '../../../lib/response';
import Top from '../../../models/other/top';

const get: RequestResponseNext = async (req, res) => {
  const tops = await Top.findAll({});
  res.json(response({ data: { tops } }));

};

export default {
  get,
};
