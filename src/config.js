// 配置文件，服务端入口
// 原服务器地址：http://139.129.24.151:5000/
// 替换服务器地址：http://115.28.16.220:5000/

export const API_ROOT = (process.env.NODE_ENV === 'production')
    ?'http://139.129.24.151:5000/'
    :'http://localhost:3000/';

export const CookieDomain = (process.env.NODE_ENV === 'production')
    ?'http://139.129.24.151:5000/'
    :'http://localhost:3000/';
