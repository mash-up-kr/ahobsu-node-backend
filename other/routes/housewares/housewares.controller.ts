
import { RequestResponseNext } from '..';
import response from '../../../lib/response';
import Houseware from '../../../models/other/houseware';

const get: RequestResponseNext = async (req, res) => {
  const housewares = await Houseware.findAll({});
  res.json(response({ data: { housewares } }));

};

export default {
  get,
};
