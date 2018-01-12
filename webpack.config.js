require('dotenv').config();
var path = require('path');
var webpack = require('webpack');
var argv = require('minimist')(process.argv.slice(2));
var ASSET_PATH = 'assets/'

module.exports = {
  entry: path.resolve(__dirname, 'src') + '/index.js',
  output: {
    path: path.resolve(__dirname, 'public/js'),
    filename: 'app.js',
    publicPath: '/js/'
    // public path is where you put in to the link: <script src='publicPath/**'></script>
  },
  module: {
    loaders: [{
      test: /\.js$/, // find all js file
      include: path.resolve(__dirname, 'src'),
      loader: 'babel-loader',
      query: {
        presets: ['react', 'es2015'],
        plugins: ['react-html-attrs', 'transform-decorators-legacy', 'transform-class-properties']
      }
    }, {
      test: /\.sass$/,
      loader: 'style-loader!css-loader!sass-loader'
    }, {
      test: /\.css$/,
      loader: 'style-loader!css-loader'
    }]
  },
  devServer: {
    historyApiFallback: true,
    contentBase: path.join(__dirname, 'public'),
    compress: true,
    stats: "errors-only",
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      "ENV": {
        "debug": JSON.parse(process.env.DEBUG),
        "assets": JSON.stringify(ASSET_PATH)
      }
    })
  ]
};
