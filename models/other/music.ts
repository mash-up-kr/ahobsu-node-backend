import { DataTypes, Model } from 'sequelize';
import { dbType } from '../index';
import { sequelize } from '../sequelize';

class Music extends Model {
  public readonly id!: number;

  public readonly title!: string;
  public readonly imageUrl!: string;
  public readonly musicUrl!: string;
  public readonly type!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Music.init(
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
    musicUrl: {
      type: DataTypes.STRING,
    },
    type: { type: DataTypes.STRING },
  },
  {
    sequelize,
    modelName: 'music',
    tableName: 'musics',
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci',
  },
);

export const associate = (db: dbType) => {};

export default Music;
