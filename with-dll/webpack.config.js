const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const vendorsManifest = require(path.resolve(__dirname, 'vendors', 'vendors-manifest.dll.json'));

module.exports = {
  entry: {
    main: path.resolve(__dirname, '..', 'src', 'main.js')
  },
  mode: 'development',
  output: {
    path: path.resolve(__dirname, 'build'),
    publicPath: '/',
    filename: '[name].js'
  },
  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      use: { loader: 'babel-loader' }
    }]
  },
  plugins: [
    new CopyWebpackPlugin([
      {
        to: path.resolve(__dirname, 'build', 'vendors.js'),
        from: path.resolve(__dirname, 'vendors', 'vendors.dll.js')
      },
      {
        to: path.resolve(__dirname, 'build', 'index.html'),
        from: path.resolve(__dirname, '..', 'src', 'template.html')
      }
    ]),
    new webpack.DllReferencePlugin({
      manifest: vendorsManifest
    })
  ]
};
