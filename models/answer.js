module.exports = (Sequelize, DataTypes) => {
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
  answers.associate = db => {
    db.answers.belongsTo(db.missions);
  };
  return answers;
};
