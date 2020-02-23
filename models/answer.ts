import { Sequelize, SequelizeStatic } from 'sequelize';

export default (Sequelize: Sequelize, DataTypes: SequelizeStatic) => {
  const answers = Sequelize.define(
    'answers',
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      userId: {
        type: DataTypes.INTEGER,
      },
      missionId: {
        type: DataTypes.INTEGER,
      },
      imageUrl: {
        type: DataTypes.STRING,
      },
      cardUrl: {
        type: DataTypes.STRING,
      },
      content: { type: DataTypes.STRING },
      date: { type: DataTypes.STRING },
      setDate: { type: DataTypes.STRING },
    },
    {},
  );
  answers.associate = (db: any) => {
    db.answers.belongsTo(db.missions);
  };
  return answers;
};

export interface Answers {
  id?: number;
  userId: number;
  missionId: number;
  imageUrl: string | null;
  cardUrl?: string;
  content: string | null;
  date?: string;
  setDate?: string;
}
