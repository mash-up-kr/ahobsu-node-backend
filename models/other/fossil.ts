import { DataTypes, Model } from 'sequelize';
import { dbType } from '../index';
import { sequelize } from '../sequelize';

class Fossil extends Model {
  public readonly id!: number;

  public readonly name!: string;
  public readonly imageUrl!: string;
  public readonly price!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Fossil.init(
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
    price: { type: DataTypes.INTEGER },
  },
  {
    sequelize,
    modelName: 'fossil',
    tableName: 'fossils',
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci',
  },
);

export const associate = (db: dbType) => {};

export default Fossil;
