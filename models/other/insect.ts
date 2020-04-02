import { DataTypes, Model } from 'sequelize';
import { dbType } from '../index';
import { sequelize } from '../sequelize';

class Insect extends Model {
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
  public readonly price!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Insect.init(
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
    extraPeriod: { type: DataTypes.STRING },
    extraStartTime: { type: DataTypes.INTEGER },
    extraEndTime: { type: DataTypes.INTEGER },
    location: { type: DataTypes.STRING },
    price: { type: DataTypes.INTEGER },
  },
  {
    sequelize,
    modelName: 'insect',
    tableName: 'insects',
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci',
  },
);

export const associate = (db: dbType) => {};

export default Insect;

// 1꽃 주변
// 2검정, 파랑, 보라색 꽃 주변
// 3나무 근처
// 4공중(불빛이 있는 곳 근처)
// 5나무
// 6풀밭
// 7흰 꽃 위
// 8나무(흔들기)
// 9공중
// 10물가
// 11땅 속
// 12연못
// 13강, 연못
// 14꽃 위
// 15땅 위
// 16그루터기
// 17야자수
// 18눈덩이(놀동숲 이후)
// 19나무 밑(가구로 의태)
// 20썩은 무, 사탕
// 21해변(소라껍데기로 위장)
// 22해변 암반
// 23쓰레기,썩은 무,라플레시아
// 24주민의 몸
// 25바위
// 26바위치기
