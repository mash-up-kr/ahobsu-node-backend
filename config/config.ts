import dotenv from 'dotenv';
dotenv.config();

type Config = {
  username: string;
  password: string;
  database: string;
  host: string;
  [key: string]: any;
};

interface IConfigGroup {
  development: Config;
  test: Config;
  production: Config;
}

const config: IConfigGroup = {
  development: {
    username: process.env.DB_USERNAME!,
    password: process.env.DB_PASSWORD!,
    database: 'test',
    host: process.env.DB_HOST!,
    dialect: 'mysql',
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
    database: 'test',
    storage: ':memory:',
    host: 'localhost',
    dialect: 'sqlite',
    logging: false,
  },
  production: {
    username: 'root',
    password: '',
    database: 'database_production',
    host: '127.0.0.1',
    dialect: 'mysql',
  },
};

export default config;
