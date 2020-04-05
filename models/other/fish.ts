import { DataTypes, Model } from 'sequelize';
import { dbType } from '../index';
import { sequelize } from '../sequelize';

class Fish extends Model {
  public readonly id!: number;

  public readonly name!: string;
  public readonly imageUrl!: string;
  public readonly period!: string;
  public readonly startTime!: number;
  public readonly endTime!: number;

  public readonly extraPeriod!: string;
  public readonly extraStartTime!: number;
  public readonly extraEndTime!: number;

  public readonly location!: string;
  public readonly size!: number;
  public readonly price!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Fish.init(
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
    imageUrl: {
      type: DataTypes.STRING,
    },
    period: { type: DataTypes.STRING },
    startTime: { type: DataTypes.INTEGER },
    endTime: { type: DataTypes.INTEGER },
    ExtraPeriod: { type: DataTypes.STRING },
    ExtraStartTime: { type: DataTypes.INTEGER },
    ExtraEndTime: { type: DataTypes.INTEGER },
    location: { type: DataTypes.STRING },
    size: { type: DataTypes.INTEGER },
    price: { type: DataTypes.INTEGER },
  },
  {
    sequelize,
    modelName: 'fish',
    tableName: 'fishs',
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci',
  },
);

export const associate = (db: dbType) => {};

export default Fish;

// 1절벽위
// 2하구
// 3연못
// 4강
// 5호수
// 6바다
// 7부두

// 1작다
// 2약간작다
// 3중간
// 4약간크다
// 5크다
// 6특대
// 7특대(등지느러미)
// 8길다
// 9약간크다(등지느러미)
