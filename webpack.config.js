var webpack = require('webpack');
module.exports = {
  entry: {
    app: ['webpack/hot/dev-server', './src/app.js']
  },
  output: {
    path: './bin',
    filename: 'app.bundle.js'
  },
  devServer: {
    contentBase: './views',
    publicPath: 'http://localhost:8080/bin/'
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel', exclude: /node_modules/, query: { presets: ['react', 'es2015', 'stage-0'], plugins: ['transform-decorators-legacy'] } },
      { test: /\.jsx$/, loader: 'babel', exclude: /node_modules/, query: { presets: ['react', 'es2015', 'stage-0'], plugins: ['transform-decorators-legacy'] } }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
};
