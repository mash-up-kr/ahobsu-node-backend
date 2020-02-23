import { Sequelize, SequelizeStatic } from 'sequelize';

export default (Sequelize: Sequelize, DataTypes: SequelizeStatic) => {
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
      cycle: {
        type: DataTypes.INTEGER,
      },
    },
    {},
  );
  missions.associate = (db: any) => {
    db.missions.hasMany(db.answers);
  };
  return missions;
};

export interface Mission {
  id?: number;
  title: string;
  isContent: boolean;
  isImage: boolean;
  cycle: number;
}
