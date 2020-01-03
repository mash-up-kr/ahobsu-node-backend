const { paths } = require('./path/base');
const users = require('./path/users');

Object.keys(users).forEach(key => {
  paths[key] = users[key];
});

module.exports = {
  swagger: '2.0',
  info: {
    title: 'Ahobsu-Node-Backend',
    version: '1.0.0',
    description: 'Make Node.js',
  },
  license: {
    name: 'Apache 2.0',
    url: 'http://www.apache.org/licenses/LICENSE-2.0.html',
  },
  schemes: [
    // 'https',
    'http',
  ],
  paths,
  securityDefinitions: {
    apiKey: {
      type: 'apiKey',
      name: 'api_token',
      in: 'query',
    },
  },
};
