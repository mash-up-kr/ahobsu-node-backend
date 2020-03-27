const { paths } = require('./path/base');
const answers = require('./path/answers.swagger');
const files = require('./path/files.swagger');
const missions = require('./path/missions.swagger');
const signin = require('./path/signin.swagger');
const users = require('./path/users.swagger');
const questions = require('./path/questions.swagger');

Object.keys(questions).forEach(key => {
  paths[key] = questions[key];
});

Object.keys(answers).forEach(key => {
  paths[key] = answers[key];
});

Object.keys(files).forEach(key => {
  paths[key] = files[key];
});

Object.keys(missions).forEach(key => {
  paths[key] = missions[key];
});

Object.keys(signin).forEach(key => {
  paths[key] = signin[key];
});

Object.keys(users).forEach(key => {
  paths[key] = users[key];
});

export default {
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
  schemes: ['https', 'http'],
  paths,
  securityDefinitions: {
    apiKey: {
      type: 'apiKey',
      name: 'api_token',
      in: 'query',
    },
  },
};
