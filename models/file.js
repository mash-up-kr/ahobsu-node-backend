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
      file: {
        type: DataTypes.INTEGER,
      },
      date: {
        type: DataTypes.DATE,
      },
    },
    {},
  );
  // Answer.associate = (models) => {
  //   // associations can be defined here
  // };
  return files;
};
