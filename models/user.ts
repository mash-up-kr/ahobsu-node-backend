import { Sequelize, SequelizeStatic } from 'sequelize';

export default (Sequelize: Sequelize, DataTypes: SequelizeStatic) => {
  const users = Sequelize.define(
    'users',
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      birthday: {
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
      },
      name: {
        type: DataTypes.STRING,
      },
      gender: {
        type: DataTypes.STRING,
      },
      refreshDate: {
        type: DataTypes.STRING,
      },
      refreshToken: {
        type: DataTypes.STRING,
      },
      mission: {
        type: DataTypes.TEXT,
      },
      snsId: {
        type: DataTypes.STRING,
      },
      snsType: {
        type: DataTypes.STRING,
      },
    },
    {},
  );
  // Users.associate = (models) => {
  //   // associations can be defined here
  // };
  return users;
};
