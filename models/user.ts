import { dbType } from '.';
import { Model, DataTypes } from 'sequelize';
import { sequelize } from './sequelize';

class User extends Model {
  public readonly id!: number;
  public birthday!: string;
  public email!: string;
  public name!: string;
  public gender!: string;
  public refreshDate!: string;
  public refreshToken!: string;
  public mission!: string;
  public snsId!: string;
  public snsType!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}
User.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    birthday: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    name: {
      type: DataTypes.STRING,
    },
    gender: {
      type: DataTypes.STRING,
    },
    refreshDate: {
      type: DataTypes.STRING,
    },
    refreshToken: {
      type: DataTypes.STRING,
    },
    mission: {
      type: DataTypes.TEXT,
    },
    snsId: {
      type: DataTypes.STRING,
    },
    snsType: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: 'user',
    tableName: 'users',
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci',
  },
);

export const associate = (db: dbType) => {
  db.User.hasMany(db.Answer);
};

export default User;
