// webpack 配置文件 生产环境

'use strict';

var webpack = require('webpack');
var path = require('path');

module.exports = {

    output: {
        publicPath: "/public/",
        path: path.join(__dirname,'public/'),
        filename: 'bundle.js'
    },

    entry: ['./src/index.js'],



    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loaders: ['babel?presets[]=react,presets[]=es2015,presets[]=stage-0,plugins[]=transform-decorators-legacy,plugins[]=syntax-async-functions'],
            },
            {
                test: /.scss$/,
                exclude: /node_modules/,
                loader: 'style!css!sass'
            },
            { test: /\.json$/, loader: "json-loader" },
            {
                test: /\.(jpe?g|png|gif)$/i,
                loaders: [
                    'url?limit=10000'
                ]
            },
            {
                test: /.css$/,

                loader: 'style!css'
            },
            {
                test:/.less$/,
                loader:'style!css!less'
            },
            {
                test: /\.(woff|woff2|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'url?limit=10000&name=fonts/[hash:8].[name].[ext]'
            }

        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env':{
                'NODE_ENV': JSON.stringify('production')
            }
        })
    ]
};
