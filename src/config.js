// 配置文件，服务端入口

export const API_ROOT = (process.env.NODE_ENV === 'production')
    ?'http://139.129.24.151:5000/'
    :'http://localhost:3000/';

export const CookieDomain = (process.env.NODE_ENV === 'production')
    ? 'http://139.129.24.151:5000/'
    : 'http://localhost:3000/';