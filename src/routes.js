// 应用的所有路由

import React from 'react';
import {Route,IndexRoute} from 'react-router';

import App from './components/App'; // 应用入口
import Home from './components/Home'; // 主页
import HomeArticle from './components/HomeArticleNew';//显示文章的主页
import HomeQuestion from './components/HomeQuestionNew';//显示问题主页
import HomeArticleHot from './components/HomeArticleHot';//显示最热文章
import HomeQuestionHot from './components/HomeQuestionHot';//显示最热问答
import SearchShow from './components/SearchShow' ;//显示搜索内容

import Login from './components/Login'; // 登录
import Register from './components/Register'; // 注册

import WriteArticle from './components/WriteArticle';// 写文章
import WriteQuestion from './components/WriteQuestion';// 提问题

import Article from './components/Article';//文章详情页
import Question from './components/Question';//问答详情页

import PersonalPage from './components/PersonalPage';// 个人中心
import UserPage from './components/PersonalPage/UserPage';//个人页面
import UserArticles from './components/PersonalPage/UserArticles';//我的文章
import UserQuestions from './components/PersonalPage/UserQuestions';//我的问答
import UserTags from './components/PersonalPage/UserTags';//管理标签
import UserComments from './components/PersonalPage/UserComments';//我的评论
import UserSetting from './components/PersonalPage/UserSetting';//个人设置
import UserReputation from './components/PersonalPage/UserReputation';//声望记录
import UserSafe from './components/PersonalPage/UserSafe';//用户安全中心

import HintVerifyEmail from './components/VerifyEmail/hintVerifyEmail';// 验证邮箱
import VerifyEmail from './components/VerifyEmail/verifyEmail';// 验证成功

import { requireAuthentication } from './components/AuthenticatedComponent'; // 已经登录之后
import { requireNoAuthentication } from './components/notAuthenticatedComponent';// 还未登录时


export default ()=>(
    <Route path='/' component={App}>
        <IndexRoute component={Home}/>
        <Route path='/homearticle' components={HomeArticle}/>
        <Route path='/homequestion' components={HomeQuestion}/>
        <Route path='/homearticlehot' components={HomeArticleHot}/>
        <Route path='/homequestionhot' components={HomeQuestionHot}/>
        <Route path='/search' components={SearchShow}/>
        <Route path='/login' component={Login}/>
        <Route path='/register' component={Register}/>
        <Route path='/hintverifyemail' component={HintVerifyEmail}/>
        <Route path='/verifyemail' component={VerifyEmail}/>
        <Route path='/write' component={WriteArticle} />
        <Route path='/writeq' component={WriteQuestion} />
        <Article path="/article/:id" component={Article} />
        <Question path="/question/:id" component={Question}/>
        <PersonalPage path='/personalpage' component={PersonalPage}>
            <IndexRoute component={UserPage} />
            <Route path='articles' component={UserArticles} />
            <Route path='questions' component={UserQuestions} />
            <Route path='tags' component={UserTags} />
            <Route path='comments' component={UserComments} />
            <Route path='users' component={UserSetting} />
            <Route path='reputation' component={UserReputation} />
            <Route path='safe' components={UserSafe} />
        </PersonalPage>
    </Route>
)