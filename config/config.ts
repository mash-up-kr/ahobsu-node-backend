import dotenv from 'dotenv';
dotenv.config();

export default {
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: 'chocopie',
    host: process.env.DB_HOST,
    dialect: 'mysql',
    operatorsAliases: false,
    timezone: '+09:00',
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
    logging: true,
  },
  test: {
    username: 'root',
    password: 'root',
    database: 'chocopie',
    storage: ':memory:',
    host: 'localhost',
    dialect: 'sqlite',
    operatorsAliases: false,
    logging: false,
  },
  production: {
    username: 'root',
    password: '',
    database: 'database_production',
    host: '127.0.0.1',
    dialect: 'mysql',
    operatorsAliases: false,
  },
};
