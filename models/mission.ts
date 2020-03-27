import { dbType } from '.';
import { Model, DataTypes } from 'sequelize';
import { sequelize } from './sequelize';

class Mission extends Model {
  public readonly id!: number;
  public title!: string;
  public isContent!: boolean;
  public isImage!: boolean;
  public cycle!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}
Mission.init(
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
    isContent: {
      type: DataTypes.BOOLEAN,
    },
    isImage: {
      type: DataTypes.BOOLEAN,
    },
    cycle: {
      type: DataTypes.INTEGER,
    },
  },
  {
    sequelize,
    modelName: 'mission',
    tableName: 'missions',
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci',
  },
);

export const associate = (db: dbType) => {
  db.Mission.hasMany(db.Answer);
};

export default Mission;
