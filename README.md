# 实验班问答交流平台  a forum of experimental class

## 一期实现
1. 登录：（用户名u_name/邮箱u_email && 密码u_psw）
2. 注册：（用户名u_name && 邮箱u_email && 密码u_psw）
3. 用户信息：(返回数据，显示相关信息)
4. 文章：（增加{markdown；纯文本}&&删除&&显示{推荐；收藏}&&更改&&搜索）


----------


## 二期实现


----------


## 三期实现


----------


## 系统架构
> 典型的BS架构，以浏览器的使用为主。目前主要以PC端交互为主，但部分关键或常用功能应保证移动WEB兼容性。同时，在技术架构上，应考虑全端支持的可扩展性。


----------


## 技术路线
* 前端主体框架使用React，搭建单页应用
* 前端 express搭建的静态页面服务
* 后端技术栈 Python3 + Flask + MySQL.  
* 开发与部署平台  *nix
* 项目托管 Github    
* 项目原型 Quora & SF


----------


## 前端实现

1. 'express'搭建服务请求,
2. 'react'构建的单页应用,
3. 'bootstrap'样式框架,
4. 'redux'的数据交互,
5. 'babel'转换编译ES6,
6. 'webpack'打包编译js


----------
## 文件结构
```
.
├── src                             // 生产目录
│   ├── actions                     // redux action目录
│   ├── api                         // API 请求
│   ├── assets                      // 图片
│   ├── components                  // 组件
│   │   ├── Article                 // 文章详情
│   │   ├── Home                    // 主页
│   │   ├── Login                   // 登录
│   │   ├── Register                // 注册
│   │   ├── VerifyEmail             // 验证邮箱
│   │   ├── PersonalPage            // 个人主页
│   │   ├── ScrollTop               // 返回顶部
│   │   ├── Setting                 // 设置
│   │   └── WriteArticle            // 写文章
│   ├── reducers                    // redux reducer目录
│   ├── store                       // store配置
│   ├── utiles                      // 工具函数
│   ├── stylesheets                 // 样式文件
│   ├── index.js                    // 客户端入口
│   ├── config.js                   // url配置文件
│   └── routes.js                   // 路由配置
├── public                          // 样式目录
│   └── fonts                       // 字体
├── README.md                       // 说明文件 
├── package.json                    // 项目依赖
├── process.json                    // 更新，生成日志
├── webpack.config.js               // webpack打包,开发模式下
├── webpack.config.production.js    // webpack打包,生产模式下
├── server.js                       // 配置，开发模式下
├── app.js                          // 配置，生产模式下
└── index.html                      // 页面
.
```

----------
**运行**
```
    'npm install'
    'node server'
    ('export NODE_ENV = production')
    ('node app')
```
        

