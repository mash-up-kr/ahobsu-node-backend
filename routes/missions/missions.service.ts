import { Mission } from '../../models/mission';
import { getDateString } from '../../lib/date';
import { User } from '../../models/user';

export const isRequired = ({ title, isContent, isImage, cycle }: Mission) => {
  return !title || (!isContent && isContent !== false) || (!isImage && isImage !== false) || !cycle;
};

export const getOldMission = (user: { mission: string }) => {
  const { mission } = user;
  return mission && JSON.parse(mission);
};

export const hasOldMissions = (oldMission: any) => {
  const date = getDateString();
  return !!oldMission && oldMission.date === date && oldMission.missions.length > 0;
};

export const isRefresh = (user: User) => {
  const date = getDateString();
  return !user.refreshDate || (!!user.refreshDate && user.refreshDate < date);
};

export const hasRefresh = (user: User) => {
  const date = getDateString();
  return !!user.refreshDate && user.refreshDate === date;
};
