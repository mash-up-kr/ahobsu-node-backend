
import { RequestResponseNext } from '..';
import response from '../../../lib/response';
import DressUp from '../../../models/other/dressUp';

const get: RequestResponseNext = async (req, res) => {
  const dressUps = await DressUp.findAll({});
  res.json(response({ data: { dressUps } }));

};

export default {
  get,
};
