
import { RequestResponseNext } from '..';
import response from '../../../lib/response';
import Rug from '../../../models/other/rug';

const get: RequestResponseNext = async (req, res) => {
  const rugs = await Rug.findAll({});
  res.json(response({ data: { rugs } }));

};

export default {
  get,
};
