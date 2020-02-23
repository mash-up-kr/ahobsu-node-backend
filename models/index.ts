import Sequelize from 'sequelize';
import configDate from '../config/config';
import answer from './answer';
import file from './file';
import mission from './mission';
import user from './user';
import question from './question';

const env = (process.env.NODE_ENV || 'development') as 'development' | 'test' | 'production';
const config = configDate[env];
const db = {} as any;

const options =
  process.env.NODE_ENV === 'test'
    ? {
        username: 'root',
        password: 'root',
        storage: ':memory:',
        host: 'localhost',
        dialect: 'sqlite',
        operatorsAliases: false,
        logging: false,
      }
    : {
        host: config.host,
        dialect: 'mysql',
        timezone: '+09:00',
        operatorsAliases: false,
        define: {
          timestamps: true,
        },
        dialectOptions: {
          dateStrings: true,
          typeCast: true,
        },
        pool: {
          min: 0,
          max: 10,
          idle: 10000,
          acquire: 10000,
        },
        logging: false,
      };

// let sequelize;
// if (config.use_env_variable) {
// sequelize = new Sequelize(process.env[config.use_env_variable], config.options);
// } else {
const sequelize = new Sequelize(config.database, config.username, config.password, options);
// }

db.answers = answer(sequelize, Sequelize);
db.files = file(sequelize, Sequelize);
db.missions = mission(sequelize, Sequelize);
db.users = user(sequelize, Sequelize);
db.questions = question(sequelize, Sequelize);

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
