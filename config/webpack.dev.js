const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const commonConfig = require('./webpack.common.js');
const helpers = require('./helpers');

const config = webpackMerge(commonConfig, {
    devtool: 'cheap-module-eval-source-map',
    output: {
        path: helpers.root('dist'),
        publicPath: '/',
        filename: '[name].js',
        chunkFilename: '[id].chunk.js'
    },
    devServer: {
        historyApiFallback: true,
        inline: true,
        stats: 'minimal',
        host: '0.0.0.0',
        port: 4002
    },
    plugins: [
        new ExtractTextPlugin('[name].css')
    ]
});

// --inline --progress --port 4002
// rimraf dist && webpack --config config/webpack.prod.js --progress --profile --bail

module.exports = config;