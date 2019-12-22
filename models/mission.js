module.exports = (Sequelize, DataTypes) => {
  const missions = Sequelize.define(
    'missions',
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
    },
    {},
  );
  // Answer.associate = (models) => {
  //   // associations can be defined here
  // };
  return missions;
};
