import { RequestResponseNext } from '..';
import response from '../../../lib/response';
import Design from '../../../models/other/design';

const get: RequestResponseNext = async (req, res) => {
  const { type } = req.query;
  const designs = type
    ? await Design.findAll({ where: { type }, order: [['id', 'DESC']] })
    : await Design.findAll({ order: [['code', 'ASC']] });
  res.json(response({ data: { designs } }));
};

export default {
  get,
};
