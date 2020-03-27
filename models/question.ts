import { dbType } from '.';
import { Model, DataTypes } from 'sequelize';
import { sequelize } from './sequelize';

class Question extends Model {
  public readonly id!: number;
  public content!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}
Question.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    content: { type: DataTypes.STRING },
  },
  {
    sequelize,
    modelName: 'question',
    tableName: 'questions',
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci',
  },
);

export default Question;
