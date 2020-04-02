import { DataTypes, Model } from 'sequelize';
import { dbType } from '../index';
import { sequelize } from '../sequelize';

class Design extends Model {
  public readonly id!: number;

  public readonly title!: string;
  public readonly imageUrl!: string;
  public readonly type!: string;
  public readonly code!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Design.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    title: {
      type: DataTypes.STRING,
    },
    imageUrl: {
      type: DataTypes.STRING,
    },
    type: { type: DataTypes.STRING },
    code: { type: DataTypes.STRING },
  },
  {
    sequelize,
    modelName: 'design',
    tableName: 'designs',
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci',
  },
);

export const associate = (db: dbType) => {};

export default Design;
