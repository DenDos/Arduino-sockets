'use strict';

var webpack           = require('webpack'),
    ExtractTextPlugin = require('extract-text-webpack-plugin'),
    path              = require('path'),
    Visualizer        = require('webpack-visualizer-plugin'),
    HtmlWebpackPlugin = require('html-webpack-plugin');

var opts = {
  app: path.resolve(__dirname, 'app'),
  root:  path.resolve(__dirname, 'app'),
  output_dir: __dirname + '/build',
  output_name: 'bundle.js'
}

//var template = require("jade!./file.jade");

var cssAppExtractor = new ExtractTextPlugin('app.css')


module.exports = {
  context: opts.app,
  resolve: {
    root: opts.root
  },
  devServer: {
    headers: { "Access-Control-Allow-Origin": "*" }

  },
  entry: {
    app: ['webpack-hot-middleware/client?reload=true','webpack/hot/dev-server', './bootstrap.js']
  },
  output: {
    path: opts.output_dir,
    filename: opts.output_name,
    publicPath: '/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    cssAppExtractor,
    new Visualizer(),
    new webpack.ProvidePlugin({
        moment: 'moment',
        _: 'underscore'
    }),
    new HtmlWebpackPlugin({
      template: 'index.html',
      inject:   'body',
      filename: 'index.html'
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    })
  ],
  module: {
    loaders: [
      {
        test: /\.(sass|css|scss)$/,
        loader: cssAppExtractor.extract(['css','sass'])
      },
      {
        test: /\.js$/,
        loader: 'ng-annotate!babel?presets[]=es2015!jshint',
        exclude: /node_modules|bower_components/
      },
      {
        test: /\.(ttf|otf|woff|eot|png|jpg|gif|svg)$/,
        loader: 'url-loader?limit=32000'
      },
      {
        test: /\.html$/,
        loader: 'html'
      }
    ]
  }
};
