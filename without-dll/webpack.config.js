const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: {
        main: path.resolve(__dirname, '..', 'src', 'main.js')
    },
    optimization: {
      splitChunks: {
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/](react|react-dom|react-redux|redux)[\\/]/,
            name: 'vendors',
            chunks: 'all'
          }
        }
      }
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
          to: path.resolve(__dirname, 'build', 'index.html'),
          from: path.resolve(__dirname, '..', 'src', 'template.html')
        }
      ])
    ],
};
