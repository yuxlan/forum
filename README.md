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
forum                            
├── src                                    || 生产目录
│   ├── actions                            || 包含所有前后端数据交互操作
│   │   ├── auth.js                        || 用户登录注册操作
│   │   ├── admin.js                       || 用户对自己信息管理的所有操作
│   │   ├── article.js                     || 文章部分所有操作
│   │   ├── comment.js                     || 评论部分所有操作
│   │   ├── question.js                    || 问答部分所有操作
│   │   ├── other.js                       || 其它，包括显示错误信息之类
│   │   ├── index.js                       || 整合文件
│   │   └── types.js                       || 全局数据变量
│   ├── api                                || API 请求文件夹
│   │   ├── resources.js                   || axios配置以及后端API接口
│   │   ├── index.js                       || 获取后端数据的具体方法及数据
│   │   └── promiseMiddleware.js           || 中间件配置文件
│   ├── assets                             || 图片
│   │   ├── images                         || 首页图片文件夹
│   │   └── imgs                           || 子页面图片文件夹
│   ├── components                         || 组件文件夹
│   │   ├── Article                        || 文章详情
│   │   │   ├── comment.js                 || 文章评论显示
│   │   │   ├── content.js                 || 文章内容显示
│   │   │   ├── like.js                    || 点赞显示
│   │   │   ├── reply.js                   || 回复评论显示
│   │   │   └── index.js                   || 整合文件，父组件
│   │   ├── Question                       || 问答详情
│   │   │   ├── comment.js                 || 问答评论显示
│   │   │   ├── content.js                 || 问答内容显示
│   │   │   ├── like.js                    || 点赞显示
│   │   │   ├── reply.js                   || 回复评论显示
│   │   │   └── index.js                   || 整合文件，父组件
│   │   ├── Home                           || 主页
│   │   │   ├── article.js                 || 文章显示
│   │   │   ├── tags.js                    || 标签显示
│   │   │   ├── navbar.js                  || 导航
│   │   │   ├── footer.js                  || 页尾
│   │   │   ├── loadMore.js                || 加载更多
│   │   │   └── index.js                   || 整合文件，父组件
│   │   ├── HomeArticleHot                 || 最热文章
│   │   │   ├── article.js                 || 文章显示
│   │   │   ├── tags.js                    || 标签显示
│   │   │   ├── navbar.js                  || 导航
│   │   │   ├── footer.js                  || 页尾
│   │   │   └── index.js                   || 整合文件，父组件
│   │   ├── HomeArticleNew                 || 最新文章
│   │   │   ├── article.js                 || 文章显示
│   │   │   ├── tags.js                    || 标签显示
│   │   │   ├── navbar.js                  || 导航
│   │   │   ├── footer.js                  || 页尾
│   │   │   └── index.js                   || 整合文件，父组件
│   │   ├── HomeQuestionHot                || 最热问答
│   │   │   ├── article.js                 || 问答显示
│   │   │   ├── tags.js                    || 标签显示
│   │   │   ├── navbar.js                  || 导航
│   │   │   ├── footer.js                  || 页尾
│   │   │   └── index.js                   || 整合文件，父组件
│   │   ├── HomeQuestionNew                || 最新问答
│   │   │   ├── article.js                 || 问答显示
│   │   │   ├── tags.js                    || 标签显示
│   │   │   ├── navbar.js                  || 导航
│   │   │   ├── footer.js                  || 页尾
│   │   │   └── index.js                   || 整合文件，父组件
│   │   ├── Login                          || 登录
│   │   │   └── index.js		
│   │   ├── Register                       || 注册
│   │   │   └── index.js		
│   │   ├── NotFound                       || 404页面
│   │   │   └── index.js		
│   │   ├── PersonalPage                   || 个人主页
│   │   │   ├── UserArticles.js            || 个人文章管理
│   │   │   ├── UserComments.js            || 个人评论管理
│   │   │   ├── UserQuestion.js            || 个人问答管理
│   │   │   ├── UserReputation.js          || 个人声望管理
│   │   │   ├── UserTags.js                || 个人标签管理
│   │   │   ├── UserSettiong.js            || 个人信息更改
│   │   │   ├── UserPage.js                || 个人主要信息显示
│   │   │   └── index.js                   || 整合，父组件
│   │   ├── VerifyEmail                    || 验证邮箱
│   │   │   └── index.js		
│   │   ├── ScrollTop                      || 返回顶部
│   │   │   └── index.js		
│   │   ├── WriteArticle                   || 写文章
│   │   │   ├── controller.js              || 编辑器工具栏
│   │   │   ├── marked.js                  || markdown语法
│   │   │   └── index.js                   || 编辑器主要部分
│   │   ├── App.js                         || 组件入口文件
│   │   ├── AuthenticatedComponent.js      || 判断已经登录
│   │   └── not AuthenticatedComponent.js  || 处理未登录状态
│   ├── reducers                           || reducer目录
│   │   ├── auth.js                        || 用户登录注册数据管理
│   │   ├── adminArticleList.js            || 用户文章数据管理
│   │   ├── adminCommentList.js            || 用户评论数据管理
│   │   ├── adminQuestionList.js           || 用户问答数据管理
│   │   ├── adminQueryReputation.js        || 用户声望数据管理
│   │   ├── adminTagList.js                || 用户标签数据管理
│   │   ├── adminUserList.js               || 用户信息数据管理
│   │   ├── tagList.js                     || 所有标签的数据管理
│   │   ├── articleList.js                 || 所有文章Id数据管理
│   │   ├── articleDetail.js               || 文章详细信息数据管理
│   │   ├── comment.js                     || 所有评论数据管理 
│   │   ├── questionList.js                || 所有问答Id数据管理
│   │   ├── questionDetail.js              || 问答详细信息数据管理
│   │   ├── option.js	                   || 改变选择时的数据变化管理
│   │   ├── showmsg.js                     || 显示相关错误显示数据管理
│   │   └── index.js                       || 整合文件
│   ├── store                              || store配置
│   │   └──configureStore.js		
│   ├── utiles                             || 工具函数文件夹
│   │   ├── index.js                       || 计算时间
│   │   └── misc.js                        || 正则验证
│   ├── stylesheets                        || 样式文件
│   │   ├── fonts                          || iconFont文件夹
│   │   ├── index.less                     || 应用的所有less样式
│   │   └── writePage.less                 || markdown的less样式
│   ├── index.js                           || 应用入口文件
│   ├── config.js                          || url配置文件
│   └── routes.js                          || 路由配置
├── node_modules                           || 依赖文件夹
├── logs                                   || 日志文件夹
│   ├── pm2-err.log                        || pm2启动错误日志
│   └── pm2-out.log                        || pm2输出记录
├── public                                 || 样式编译存储文件夹
│   ├── fonts                              || 字体文件夹
│   └── bundle.js                          || react编译文件
├── README.md                              || 应用说明文件 
├── .gitignore                             || git忽略文件
├── package.json                           || 项目依赖
├── process.json                           || 更新，生成日志
├── webpack.config.js                      || webpack打包,开发模式下
├── webpack.config.production.js           || webpack打包,生产模式下
├── server.js                              || express配置文件，开发模式下
├── app.js                                 || express配置文件，生产模式下
└── index.html                             || 页面

```

----------
**运行**
```
    'npm install'
    'node server'
    ('export NODE_ENV = production')
    ('node app')
```
        

