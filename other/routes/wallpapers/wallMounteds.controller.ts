
import { RequestResponseNext } from '..';
import response from '../../../lib/response';
import WallMounted from '../../../models/other/wallMounted';
import Wallpaper from '../../../models/other/wallpaper';

const get: RequestResponseNext = async (req, res) => {
  const wallpapers = await Wallpaper.findAll({});
  res.json(response({ data: { wallpapers } }));

};

export default {
  get,
};
