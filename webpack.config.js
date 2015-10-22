var ExtractTextPlugin = require('extract-text-webpack-plugin');

var rucksack = require('rucksack-css');

module.exports = {
  entry: './public/js/src/app.js',
  
  output: {
    path: './public/js',
    filename: 'bundle.js'
  }, 

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel'
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader!postcss-loader')
      }
    ]
  },

  postcss: function() {
    return [ rucksack({ autoprefixer: true }) ];
  },

  plugins: [
    new ExtractTextPlugin('../css/app.css')
  ]

}