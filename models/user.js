module.exports = (Sequelize, DataTypes) => {
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
      gender: {
        type: DataTypes.STRING,
      },
      refresh_date: {
        type: DataTypes.STRING,
      },
      refresh_token: {
        type: DataTypes.STRING,
      },
      sns_id: {
        type: DataTypes.STRING,
      },
      sns_type: {
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
