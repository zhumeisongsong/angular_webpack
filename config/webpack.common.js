var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var helpers = require('./helpers');


module.exports = {
  entry: {
    'polyfills': './src/polyfills.ts',
    'vendor': './src/vendor.ts',
    'app': './src/main.ts'
  },

  //extension-less imports
  resolve: {
    extensions: ['.ts', '.js']
  },

  module: {
    //which loaders to use for each file, or module
    rules: [
      {
        test: /\.ts$/,
        loaders: [
          //transpile the Typescript code to ES5
          {
            loader: 'awesome-typescript-loader',
            options: {configFileName: helpers.root('src', 'tsconfig.json')}
          },
          //loads angular components' template and styles
          'angular2-template-loader'
        ]
      },

      {
        test: /\.html$/,
        //component templates
        loader: 'html-loader'
      },

      {
        test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
        loader: 'file-loader?name=assets/[name].[hash].[ext]'
      },

      // // application-wide styles
      // {
      //   test: /\.css$/,
      //   exclude: helpers.root('src', 'app'),
      //   loader: ExtractTextPlugin.extract({ fallbackLoader: 'style-loader', loader: 'css-loader?sourceMap' })
      // },

      // // component-scoped styles
      // {
      //   test: /\.css$/,
      //   include: helpers.root('src', 'app'),
      //   loader: 'raw-loader'
      // },

      // loader config for angular component styles
      {
        test: /\.(scss|css)$/,
        loaders: ['raw-loader', 'sass-loader'], // don't use css-loader for ng2 （unusual）
      },

      // loader config for global css files
      {
        test: /\.scss$/,
        exclude: [/node_modules/, /src\/app/],
        use: ExtractTextPlugin.extract({
          fallbackLoader: 'style-loader',
          use: ['css-loader', 'sass-loader']
        })
      }
    ]
  },

  plugins: [
    new webpack.ContextReplacementPlugin(
      // The (\\|\/) piece accounts for path separators in *nix and Windows
      /angular(\\|\/)core(\\|\/)@angular/,
      helpers.root('./src'), // location of your src
      {} // a map of your routes
    ),

    new webpack.optimize.CommonsChunkPlugin({
      name: ['app', 'vendor', 'polyfills']
    }),

    new HtmlWebpackPlugin({
      template: 'src/index.html'
    })
  ]
};