import { DataTypes, Model } from 'sequelize';
import File from './file';
import { dbType } from './index';
import Mission from './mission';
import { sequelize } from './sequelize';
import User from './user';

class Answer extends Model {
  public readonly id!: number;
  public userId!: number;
  public missionId!: number;
  public fileId!: number;
  public imageUrl!: string;
  public content!: string;
  public date!: string;
  public setDate!: string;
  public no!: number;
  public file!: File;
  public mission!: Mission;
  public user!: User;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Answer.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
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
  {
    sequelize,
    modelName: 'answer',
    tableName: 'answers',
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci',
  },
);

export const associate = (db: dbType) => {
  db.Answer.belongsTo(db.Mission);
  db.Answer.belongsTo(db.File);
  db.Answer.belongsTo(db.User);
};

export default Answer;
