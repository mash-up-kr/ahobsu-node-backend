module.exports = {
  // transform: {
  //   '^.+\\.ts$': 'ts-jest',
  // },
  preset: 'ts-jest',
  testRegex: '\\.test\\.ts$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  globals: {
    'ts-jest': {
      compiler: 'typescript',
      tsConfig: {
        importHelpers: true,
      },
      diagnostics: true,
      babelConfig: {
        comments: false,
        plugins: ['@babel/plugin-transform-for-of'],
      },
    },
  },
};
