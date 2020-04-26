
import { RequestResponseNext } from '..';
import response from '../../../lib/response';
import Poster from '../../../models/other/poster';

const get: RequestResponseNext = async (req, res) => {
  const posters = await Poster.findAll({});
  res.json(response({ data: { posters } }));

};

export default {
  get,
};
