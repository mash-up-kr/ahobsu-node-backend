import { Model, DataTypes } from 'sequelize';
import { dbType } from '.';
import { sequelize } from './sequelize';

class File extends Model {
  public readonly id!: number;
  public cardUrl!: string;
  public cardSvgUrl!: string;
  public cardPngUrl!: string;
  public part!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}
File.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    cardUrl: {
      type: DataTypes.STRING,
    },
    cardSvgUrl: {
      type: DataTypes.STRING,
    },
    cardPngUrl: {
      type: DataTypes.STRING,
    },
    part: {
      type: DataTypes.INTEGER,
    },
  },
  {
    sequelize,
    modelName: 'file',
    tableName: 'files',
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci',
  },
);

export const associate = (db: dbType) => {
  // db.File.hasMany(db.Answer);
};

export default File;
