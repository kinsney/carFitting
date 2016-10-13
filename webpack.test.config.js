var join = require('path').join

module.exports = {
  context: join(__dirname, 'src'),
  entry: './app',
  output: {
    path: join(__dirname, 'dist'),
    filename: 'app.js'
  },
  resolve: {
    extensions: ['', '.js', '.json', '.vue']
  },
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel' },
      { test: /\.json$/, loader: 'json' },
      { test: /\.vue$/, loader: 'vue' },
      { test: /\.png$/, loader: 'url' }
    ]
  },
  babel: {
    presets: ['es2015'],
    plugins: ['transform-runtime']
  },
  devtool: 'eval',
  devServer: {
    contentBase: 'dist',
    inline: true,
    host: process.env.IP || '0.0.0.0',
    port: process.env.PORT || 2719
  }
}
