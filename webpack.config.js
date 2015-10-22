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
      }
    ]
  }
}