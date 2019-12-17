'use strict';
const path = require('path');
const distDir = path.resolve(__dirname, 'dist');

const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  devtool: 'source-map',

  entry: './spa/index.js',
  output: {
    filename: 'ciborg.js',
    path: distDir,
  },

  plugins: [
    new HtmlWebpackPlugin({
        title: 'CIBORG',
    }), 
    ],
  module: {
      rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
      {
        test: /\.(hbs|handlebars)$/,
        use: 'raw-loader'
      }
    ],
  },
};