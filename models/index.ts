export * from './sequelize';
import Answer, { associate as associateAnswer } from './answer';
import File, { associate as associateFile } from './file';
import Mission, { associate as associateMission } from './mission';
import Art from './other/art';
import Citizen from './other/citizen';
import Design from './other/design';
import Fish from './other/fish';
import Fossil from './other/fossil';
import Insect from './other/insect';
import Music from './other/music';
import OtherUser from './other/otherUser';
import Question from './question';
import Houseware from './other/houseware';
import Sundry from './other/sundry';
import WallMounted from './other/wallMounted';
import Wallpaper from './other/wallpaper';
import Floor from './other/floor';
import Rug from './other/rug';
import Fencing from './other/fencing';
import Photo from './other/photo';
import Poster from './other/poster';
import Tool from './other/tool';
import Top from './other/top';
import Bottom from './other/bottom';
import DressUp from './other/dressUp';
import Headwear from './other/headwear';

import User, { associate as associateUser } from './user';
const db = {
  Answer,
  File,
  Mission,
  Question,
  User,
  // other
  Fish,
  Insect,
  Citizen,
  Design,
  OtherUser,
  Music,
  Fossil,
  Art,
  Houseware,
  Sundry,
  WallMounted,
  Wallpaper,
  Floor,
  Rug,
  Fencing,
  Photo,
  Poster,
  Tool,
  Top,
  Bottom,
  DressUp,
  Headwear,
};

export type dbType = typeof db;

associateAnswer(db);
associateFile(db);
associateMission(db);
associateUser(db);

export default db;
