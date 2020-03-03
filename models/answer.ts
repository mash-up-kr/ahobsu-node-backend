import { Sequelize, SequelizeStatic } from 'sequelize';
import { Mission } from './mission';
import { File } from './file';

export default (Sequelize: Sequelize, DataTypes: SequelizeStatic) => {
  const answers = Sequelize.define(
    'answers',
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      userId: {
        type: DataTypes.INTEGER,
      },
      missionId: {
        type: DataTypes.INTEGER,
      },
      fileId: {
        type: DataTypes.INTEGER,
      },
      imageUrl: {
        type: DataTypes.STRING,
      },
      content: { type: DataTypes.STRING },
      date: { type: DataTypes.STRING },
      setDate: { type: DataTypes.STRING },
      no: {
        type: DataTypes.INTEGER,
      },
    },
    {},
  );
  answers.associate = (db: any) => {
    db.answers.belongsTo(db.missions);
    db.answers.belongsTo(db.files);
  };
  return answers;
};

export interface Answers {
  id?: number;
  userId: number;
  missionId: number;
  fileId?: number;
  imageUrl?: string;
  content?: string;
  date?: string;
  setDate?: string;
  no?: number;
  mission?: Mission;
  file?: File;
}
