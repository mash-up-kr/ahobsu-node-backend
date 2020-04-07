export * from './sequelize';
import Answer, { associate as associateAnswer } from './answer';
import File, { associate as associateFile } from './file';
import Mission, { associate as associateMission } from './mission';
import Citizen from './other/citizen';
import Fish from './other/fish';
import Insect from './other/insect';
import Question from './question';
import Design from './other/design';
import OtherUser from './other/otherUser';
import Music from './other/music';
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
};

export type dbType = typeof db;

associateAnswer(db);
associateFile(db);
associateMission(db);
associateUser(db);

export default db;
