module.exports = {
  extends: ['airbnb-typescript/base'],
  rules: {
    'max-len': ['error', { code: 1000 }],
    'no-param-reassign': 0,
    'no-console': 0,
    'global-require': 0,
  },
  parserOptions: {
    project: './tsconfig.json',
  },
};
