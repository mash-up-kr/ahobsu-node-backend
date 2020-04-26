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
    database: 'chocopie',
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
      acquire: 1000000,
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
    logging: false,
  },
  production: {
    username: process.env.DB_USERNAME!,
    password: process.env.DB_PASSWORD!,
    database: 'chocopie',
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
};

export default config;
