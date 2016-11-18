// 开启服务 开发环境下

let webpack = require('webpack');
let WebpackDevServer = require('webpack-dev-server');
let config = require('./webpack.config');

new WebpackDevServer(webpack(config), {
    publicPath: config.output.publicPath,
    hot: true,
    historyApiFallback: true,
    header:{
        'Access-Control-Allow-Origin':'*'
    }
}).listen(3000, 'localhost', function (error, result) {
    if (error) {
        return console.log(error);
    }
    console.log('forum is running on port:3000')
});