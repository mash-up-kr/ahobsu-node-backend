
import { RequestResponseNext } from '..';
import response from '../../../lib/response';
import Photo from '../../../models/other/photo';

const get: RequestResponseNext = async (req, res) => {
  const photos = await Photo.findAll({});
  res.json(response({ data: { photos } }));

};

export default {
  get,
};
