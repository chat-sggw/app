'use strict'

process.env.BABEL_ENV = 'web';

const path = require('path');
const webpack = require('webpack');

const BabelMinifyWebpackPlugin = require('babel-minify-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const ChunkManifestPlugin = require('chunk-manifest-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const merge = require('webpack-merge');

let webConfig = {
  devtool: '#cheap-module-eval-source-map',
  entry: {
    web: path.join(__dirname, '../src/main/main.js')
  },
  externals: {
    electron: 'electron'
  },
  module: {
    rules: [
      {
        test: /\.(js|vue)$/,
        enforce: 'pre',
        exclude: /node_modules/,
        use: {
          loader: 'eslint-loader',
          options: {
            formatter: require('eslint-friendly-formatter')
          }
        }
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        })
      },
      {
        test: /\.styl$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader',
            'stylus-loader'
          ]
        })
      },
      {
        test: /\.html$/,
        use: 'vue-html-loader'
      },
      {
        test: /\.js$/,
        use: 'babel-loader',
        include: [ path.resolve(__dirname, '../src/main') ],
        exclude: /node_modules/
      },
      {
        test: /\.vue$/,
        use: {
          loader: 'vue-loader',
          options: {
            extractCSS: true,
            loaders: {
              sass: 'vue-style-loader!css-loader!sass-loader?indentedSyntax=1',
              scss: 'vue-style-loader!css-loader!sass-loader'
            }
          }
        }
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        use: {
          loader: 'url-loader',
          query: {
            limit: 10000,
            name: 'imgs/[name].[hash].[ext]'
          }
        },
        exclude: /font/
      },
      {
        test: /\.(woff2?|eot|ttf|otf|svg)(\?.*)?$/,
        use: {
          loader: 'url-loader',
          query: {
            limit: 10000,
            name: 'fonts/[name].[hash].[ext]'
          }
        },
        include: /font/
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('css/styles.[contenthash].css'),
    new webpack.DefinePlugin({
      'process.env.IS_WEB': 'true'
    }),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinity,
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'runtime'
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, '../src/main/index.ejs'),
      minify: {
        collapseWhitespace: true,
        removeAttributeQuotes: true,
        removeComments: true
      },
      nodeModules: false
    })
  ],
  output: {
    filename: '[name].js',
    chunkFilename: '[name].js',
    path: path.join(__dirname, '../dist/web')
  },
  resolve: {
    alias: {
      '@': path.join(__dirname, '../src/main'),
      'vue$': 'vue/dist/vue.esm.js'
    },
    extensions: ['.js', '.vue', '.json', '.css']
  },
  target: 'web',
  devServer: {
    bonjour: true,
    historyApiFallback: true,
    hot: true,
    https: true,
    open: true,
    overlay: true
  }
};

/**
 * Adjust webConfig for production settings
 */
if (process.env.NODE_ENV === 'production') {
  webConfig = merge(webConfig, {
    devtool: '#source-map',
    output: {
      filename: '[name].[chunkhash].js',
      chunkFilename: '[name].[chunkhash].js',
    },
    plugins: [
      new BabelMinifyWebpackPlugin(),
      new CopyWebpackPlugin([
        {
          from: path.join(__dirname, '../static'),
          to: path.join(__dirname, '../dist/web/static'),
          ignore: ['.*']
        }
      ]),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': '"production"'
      }),
      new webpack.LoaderOptionsPlugin({
        minimize: true
      }),
      new webpack.optimize.OccurrenceOrderPlugin()
    ]
  });

/**
 * Adjust webConfig for dev settings
 */
} else {
  webConfig = merge(webConfig, {
    plugins: [
      new webpack.HotModuleReplacementPlugin()
    ]
  });
}

module.exports = webConfig
