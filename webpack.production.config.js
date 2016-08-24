const webpack = require('webpack');
const webpackConfig = require('./webpack.config');

webpackConfig.plugins.push(
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify('production')
    }
  }),
  new webpack.optimize.UglifyJsPlugin({
    comments: false,
    compress: {
      warnings: false
    },
    sourceMap: false
  }),
  new webpack.optimize.DedupePlugin()
);

webpackConfig.devtool = 'cheap-module-source-map';

module.exports = webpackConfig;
