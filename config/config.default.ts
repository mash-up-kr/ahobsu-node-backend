module.exports = {
  development: {
    username: 'root',
    password: null,
    database: 'database_test',
    host: '127.0.0.1',
    dialect: 'mysql',
    operatorsAliases: false,
  },
  test: {
    username: 'root',
    password: 'root',
    database: 'database_test',
    storage: ':memory:',
    host: 'localhost',
    dialect: 'sqlite',
    operatorsAliases: false,
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
