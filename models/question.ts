import { Sequelize, SequelizeStatic } from 'sequelize';

export default (Sequelize: Sequelize, DataTypes: SequelizeStatic) => {
  const questions = Sequelize.define(
    'questions',
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },

      content: { type: DataTypes.STRING },
    },
    {},
  );
  // questions.associate = (db: any) => {
  //   db.questions.belongsTo(db.missions);
  // };
  return questions;
};
