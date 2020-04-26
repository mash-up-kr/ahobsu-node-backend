
import { RequestResponseNext } from '..';
import response from '../../../lib/response';
import Sundry from '../../../models/other/sundry';

const get: RequestResponseNext = async (req, res) => {
  const sundries = await Sundry.findAll({});
  res.json(response({ data: { sundries } }));

};

export default {
  get,
};
