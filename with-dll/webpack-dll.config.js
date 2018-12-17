const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: {
    vendors: ['react', 'redux', 'react-redux', 'react-dom']
  },
  mode: 'development',
  output: {
    path: path.resolve(__dirname, 'vendors'),
    filename: '[name].dll.js',
    library: '[name]'
  },
  plugins: [
    new webpack.DllPlugin({
      name: '[name]',
      path: path.resolve(__dirname, 'vendors', '[name]-manifest.dll.json')
    })
  ],
  resolve: {
    modules: ['node_modules']
  }
};
