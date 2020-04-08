import { RequestResponseNext } from '..';
import response from '../../../lib/response';
import Music from '../../../models/other/music';

const get: RequestResponseNext = async (req, res) => {
  const musics = await Music.findAll({});
  res.json(response({ data: { musics } }));
};

export default {
  get,
};
