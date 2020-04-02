import { DataTypes, Model } from 'sequelize';
import { dbType } from '../index';
import { sequelize } from '../sequelize';

class Citizen extends Model {
  public readonly id!: number;

  public readonly name!: string;
  public readonly imgUrl!: string;
  public readonly gender!: string;
  public readonly birthday!: number;
  public readonly character!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Citizen.init(
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
    gender: { type: DataTypes.INTEGER },
    birthday: { type: DataTypes.STRING },
    character: { type: DataTypes.INTEGER },
  },
  {
    sequelize,
    modelName: 'citizen',
    tableName: 'citizens',
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci',
  },
);

export const associate = (db: dbType) => {};

export default Citizen;

// 1먹보(ぼんやり,Lazy)
// 2운동광(ハキハキ,Jock)
// 3무뚝뚝(コワイ,Cranky)
// 4느끼함(キザ,Smug)
// 5친절함(ふつう,Normal)
// 6아이돌(元気,Peppy)
// 7성숙함(オトナ,Snooty)
// 8단순활발(アネキ,Uchi)
// 10아이돌/단순활발
// 11운동광/무뚝뚝
// 12운동광/느끼함
// 13먹보/느끼함
// 14성숙함/단순활발
// 15아이돌/성숙함
// 16무뚝뚝/느끼함
// 17무뚝뚝/운동광
// 18먹보/무뚝뚝
