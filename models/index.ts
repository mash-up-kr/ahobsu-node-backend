export * from './sequelize';
import Answer, { associate as associateAnswer } from './answer';
import File, { associate as associateFile } from './file';
import Mission, { associate as associateMission } from './mission';
import Question from './question';
import User from './user';
const db = { Answer, File, Mission, Question, User };

export type dbType = typeof db;

associateAnswer(db);
associateFile(db);
// associateMission(db);

export default db;
