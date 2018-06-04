require('dotenv').config()
var webpack = require('webpack')
const path = require('path')
var HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
var babelOptions = {
  'presets': ['react', 'stage-0', ['es2015', {'modules': false}]],
  'plugins': [
    'transform-object-rest-spread',
    'transform-decorators-legacy',
    'transform-class-properties'
  ]
}

var conf = new HtmlWebpackPlugin({
  name: process.env.SITENAME || 'SSS admin',
  apiUrl: process.env.API_URL || '/api',
  basepath: process.env.BASEPATH || '',
  template: 'index.template.html',
  inject: false
})

module.exports = (env = {
  dev: true
}) => {
  const debug = env.dev
  if (!debug) {
    babelOptions.plugins.push('transform-react-remove-prop-types')
    console.log('============= PRODUCTION BUILD ======================')
  }

  const config = {
    devtool: debug ? 'inline-sourcemap' : false,
    entry: './js/main.js',
    module: {
      loaders: [
        {
          test: /\.js$/,
          exclude: /node_modules(?!(\\|\/)react-mobx-admin|(\\|\/)bstrap-react-mobx-admin|(\\|\/)mobx-router)/,
          loader: 'babel-loader',
          options: babelOptions
        }, {
          test: /\.css$/,
          use: ['css-loader']
        }
      ]
    },
    output: {
      path: path.join(__dirname, 'build'),
      filename: 'main.min.js',
      publicPath: '/'
    },
    plugins: debug ? [conf] : [
      // new webpack.optimize.OccurenceOrderPlugin(),
      new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false }),
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('production')
        }
      }),
      new CopyWebpackPlugin([{
        from: path.resolve('./node_modules/codemirror/lib/codemirror.css'),
        to: path.resolve('./build/css')
      }], {copyUnmodified: true}),
      conf
    ],
    externals: {
      'axios': 'axios',
      'mobx': 'mobx',
      'mobx-react': 'mobxReact',
      'react': 'React',
      'react-dom': 'ReactDOM'
    }
  }
  return config
}
