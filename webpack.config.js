const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/index.ts',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'bundle.js',
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-typescript'],
            },
          },
          'ts-loader',
        ],
        exclude: /node-module/,
      },
      {
        test: /\.(c|le)ss$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  [
                    'postcss-preset-env',
                    {
                      browsers: 'last 2 versions',
                    },
                  ],
                ],
              },
            },
          },
          {
            loader: 'less-loader',
          },
        ],
      },
    ],
  },

  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './src/index.html'),
      filename: 'index.html',
      title: 'snake',
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeAttributeQuotes: true,
      },
    }),
  ],
  devServer: {
    contentBase: path.join(__dirname, './dist'),
    host: 'localhost',
    port: 8080,
    progress: true,
    compress: true,
    hot: true,
    open: true,
  },
};
