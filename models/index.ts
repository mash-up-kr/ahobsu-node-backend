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
};

export type dbType = typeof db;

associateAnswer(db);
associateFile(db);
associateMission(db);
associateUser(db);

export default db;
