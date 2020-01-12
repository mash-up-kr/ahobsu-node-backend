module.exports = (Sequelize, DataTypes) => {
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
      date: {
        type: DataTypes.STRING,
      },
      cycle: {
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
