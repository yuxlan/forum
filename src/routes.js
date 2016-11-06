// 应用的所有路由

import React from 'react';
import {Route,IndexRoute} from 'react-router';

import App from './components/App'; // 应用入口
import Home from './components/Home'; // 主页
import Login from './components/Login'; // 登录
import Register from './components/Register'; // 注册

import WriteArticle from './components/WriteArticle';// 写文章

import Article from './components/Article';//文章详情页

import PersonalPage from './components/PersonalPage';// 个人中心
import UserPage from './components/PersonalPage/UserPage';//个人页面
import UserArticles from './components/PersonalPage/UserArticles';//我的文章
import UserTags from './components/PersonalPage/UserTags';//管理标签
import UserComments from './components/PersonalPage/UserComments';//我的评论
import UserSetting from './components/PersonalPage/UserSetting';//个人设置

import HintVerifyEmail from './components/VerifyEmail/hintVerifyEmail';// 验证邮箱
import VerifyEmail from './components/VerifyEmail/verifyEmail';// 验证成功

import { requireAuthentication } from './components/AuthenticatedComponent'; // 已经登录之后
import { requireNoAuthentication } from './components/notAuthenticatedComponent';// 还未登录时


export default ()=>(
    <Route path='/' component={App}>
        <IndexRoute component={Home}/>
        <Route path='/login' component={requireNoAuthentication(Login)}/>
        <Route path='/register' component={requireNoAuthentication(Register)}/>
        <Route path='/hintverifyemail' component={HintVerifyEmail}/>
        <Route path='/verifyemail' component={VerifyEmail}/>
        <Route path='/write' component={WriteArticle} />
        <Route path='/article' components={Article} />
        <PersonalPage path='/personalpage' component={PersonalPage}>
            <IndexRoute component={UserPage} />
            <Route path='/articles' component={UserArticles} />
            <Route path='/tags' component={UserTags} />
            <Route path='/comments' component={UserComments} />
            <Route path='/users' component={UserSetting} />
        </PersonalPage>
    </Route>
)