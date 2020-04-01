const path = require('path');
const nodeExternals = require('webpack-node-externals');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  // mode: process.env.NODE_ENV == 'production' ? 'production' : 'development',
  mode: 'production',
  entry: './bin/www.ts',
  target: 'node',
  output: {
    path: path.resolve(__dirname, 'dist/bin'),
    filename: 'www.js',
  },
  resolve: {
    extensions: ['.ts', '.js', 'json'],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: ['ts-loader'],
        exclude: ['/node_modules/'],
      },
    ],
  },
  node: {
    __dirname: false,
  },
  externals: [nodeExternals()],
  devtool: 'source-map',
  plugins: [new CleanWebpackPlugin()],
};
