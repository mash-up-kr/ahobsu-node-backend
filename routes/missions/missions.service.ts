import { Mission } from '../../models/mission';

export const isRequired = ({ title, isContent, isImage, cycle }: Mission) => {
  return !title || (!isContent && isContent !== false) || (!isImage && isImage !== false) || !cycle;
};
