import { getDateString } from '../../lib/date';
import Answer from '../../models/answer';
import Mission from '../../models/mission';
import User from '../../models/user';
import { getAnswersByuserIdAndDateRange } from '../answers/answers.repository';
import { getMissionsByNotInIdAndLimit } from './missions.repository';

export const isRequired = ({ title, isContent, isImage, cycle }: Mission) => {
  return !title || (!isContent && isContent !== false) || (!isImage && isImage !== false) || !cycle;
};

export const getOldMission = (user: { mission: string }) => {
  const { mission } = user;
  return mission && JSON.parse(mission);
};

export const hasOldMissions = (oldMission: any) => {
  const date = getDateString({});
  return !!oldMission && oldMission.date === date && oldMission.missions.length > 0;
};

export const isRefresh = (user: User) => {
  const date = getDateString({});
  return !user.refreshDate || (!!user.refreshDate && user.refreshDate < date);
};

export const hasRefresh = (user: User) => {
  const date = getDateString({});
  return !!user.refreshDate && user.refreshDate === date;
};

export const getNewMission = async (userId: number) => {
  const date = getDateString({});
  const oneYearAgo = getDateString({ years: -1 });
  const oneYearData = await getAnswersByuserIdAndDateRange({ userId, dateGt: oneYearAgo });
  const ids = [] as number[];
  oneYearData.forEach((answer: Answer) => {
    if (hasnMissionInAnswer({ answer, date })) {
      ids.push(answer.mission!.id!);
    }
  });
  const missions = getMissionsByNotInIdAndLimit({ ids });
  return missions;
};

export const hasnMissionInAnswer = ({ answer, date }: { answer: Answer; date: string }) => {
  return (
    !!answer &&
    !!answer.date &&
    answer.mission &&
    answer.mission.cycle &&
    answer.mission.id &&
    getDateString({ date: answer.date, day: answer.mission.cycle }) >= date
  );
};
