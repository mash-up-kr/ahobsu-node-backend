import { Sequelize, SequelizeStatic } from 'sequelize';

export default (Sequelize: Sequelize, DataTypes: SequelizeStatic) => {
  const files = Sequelize.define(
    'files',
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
      part: {
        type: DataTypes.INTEGER,
      },
    },
    {},
  );
  // Answer.associate = (models) => {
  //   // associations can be defined here
  // };
  return files;
};

export interface File {
  id: number;
  cardUrl: string;
  part: number;
}
