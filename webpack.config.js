const path = require('path');
const webpack = require('webpack');
const SRC_SCRIPTS_DIR = 'src/js/';
// const BACKGROUND_DIR = SRC_SCRIPTS_DIR + 'background/';
const CONTENT_DIR = SRC_SCRIPTS_DIR + 'content/';
const OPTIONS_DIR = SRC_SCRIPTS_DIR + 'options/';
// const POPUP_DIR = SRC_SCRIPTS_DIR + 'popup/';

module.exports = {
  entry: {
    // background: ['babel-polyfill', BACKGROUND_DIR + 'background.js'],
    content: ['babel-polyfill', CONTENT_DIR + 'content.js'],
    options: ['babel-polyfill', OPTIONS_DIR + 'options.js'],
    // popup: ['babel-polyfill', POPUP_DIR + 'popup.js']
  },
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  },
  devtool: 'cheap-source-map',
  output: {
    path: path.join(__dirname, 'dist/static'),
    filename: '[name].js'
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      React: 'react',
      ReactDOM: 'react-dom',
      _: 'lodash'
    }),
    new webpack.IgnorePlugin(/^react-for-atom$/)
  ],
  resolve: {
    root: path.resolve('.'),
    extensions: ['', '.js', '.jsx'],
    modulesDirectories: [
      './node_modules',
      './src/js/constants',
      './src/js/utils'
    ]
  },
  module: {
    noParse: /node_modules\/json-schema\/lib\/validate\.js/,
    loaders: [
    {
      test: require.resolve('jquery'),
      loader: 'expose?$!expose?jQuery'
    }, {
      key: 'json-loader',
      test: /\.json?$/,
      loaders: ['json']
    }, {
      test: /\.(gif|jpg|png|woff|woff2|eot|ttf|svg)$/,
      loader: 'url-loader?limit=100000'
    }, {
      key: 'babel-loader',
      test: /\.jsx?$/,
      exclude: /(node_modules|bower_components)/,
      loader: 'babel-loader'
    }]
  }
};
