import { RequestResponseNext } from '..';
import response from '../../../lib/response';
import Design from '../../../models/other/design';

const get: RequestResponseNext = async (req, res) => {
  const designs = await Design.findAll({});
  res.json(response({ data: { designs } }));
};

export default {
  get,
};
