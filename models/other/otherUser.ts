import { DataTypes, Model } from 'sequelize';
import { dbType } from '../index';
import { sequelize } from '../sequelize';

class OtherUser extends Model {
  public readonly id!: number;

  public readonly name!: string;
  public readonly location!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

OtherUser.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    name: {
      type: DataTypes.STRING,
    },
    location: {
      type: DataTypes.INTEGER,
    },
  },
  {
    sequelize,
    modelName: 'otherUser',
    tableName: 'otherUsers',
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci',
  },
);

export const associate = (db: dbType) => {};

export default OtherUser;

// 북반구 0
// 남반구 1
