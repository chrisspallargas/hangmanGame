const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require( 'webpack' );
const WebpackJasmineHtmlRunnerPlugin = require(
   'webpack-jasmine-html-runner-plugin'
);

const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin')

module.exports = (env, options) => ({
  entry: () => WebpackJasmineHtmlRunnerPlugin.entry(
   './spec/**.js'
),
  output: {
    path: path.resolve(__dirname + "/dist"),
    publicPath: '/index.spec.html',
    filename: '[name].bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ['ignore-loader']
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader'
        ]
      },
      {
        test: /\.(html)$/,
        use: {
          loader: 'html-loader',
          options: {
            attrs: ['img:src']
          }
        }
      }
    ]
  },
  devServer: {
    contentBase: "./dist",
    port: 3001
  },
  plugins: [
    new HtmlWebpackPlugin({ filename: 'index.html', template: "./spec/index.spec.html" }),
    new webpack.SourceMapDevToolPlugin( {
      filename: '[name].bundle.js.map'
   }),
   new WebpackJasmineHtmlRunnerPlugin( {
      fixupScripts: []
   }),
   new HtmlWebpackExternalsPlugin({
      externals: [
         {
            module: 'jquery',
            entry: 'dist/jquery.min.js',
            global: 'jQuery',
         },
         {
            module: 'jasmine-core',
            entry: 'lib/jasmine-core/jasmine.css',
            global: 'jasmine-core'
         },
         {
            module: 'jasmine-core',
            entry: 'lib/jasmine-core/jasmine.js',
            global: 'jasmine-core'
         },
         {
            module: 'jasmine-core',
            entry: 'lib/jasmine-core/jasmine-html.js',
            global: 'jasmine-core'
         },
         {
            module: 'jasmine-core',
            entry: 'lib/jasmine-core/boot.js',
            global: 'jasmine-core'
         },
      ]
   })

  ]
});