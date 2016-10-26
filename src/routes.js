// 应用的所有路由

import React from 'react';
import {Route,IndexRoute} from 'react-router';

import {adminAuth,redirectToBack,redirectToLogin} from './utiles/authService';

import App from './components/App'; // 应用入口
import Home from './components/Home'; // 主页
import Login from './components/Login'; // 登录
import Register from './components/Register'; // 注册

import PersonalPage from './components/PersonalPage';
import MyData from './components/PersonalPage/myData';//我的资料
import MyPrestige from './components/PersonalPage/myPrestige';//我的声望
import MyAttention from './components/PersonalPage/myAttention';//我的关注
import MyArticle from './components/PersonalPage/myArticle';//我的文章
import HintVerifyEmail from './components/VerifyEmail/hintVerifyEmail';//验证邮箱
import VerifyEmail from './components/VerifyEmail/verifyEmail';
import WriteArticle from './components/WriteArticle';
/*import Article from './components/Article';
import PersonalPage from './components/PersonalPage';
import Setting from './components/Setting';
import Admin from './components/Admin';
import AdminPage from './components/Admin/AdminPage';
import AdminArticles from './components/Admin/AdminArticles';
import AdminTags from './components/Admin/AdminTags';
import AdminComments from './components/Admin/AdminComments';
import AdminUsers from './components/Admin/AdminUsers';
import WriteArticle from './components/WriteArticle';*/

export default ()=>(
    <Route path="/" component={App}>
        <IndexRoute component={Home}/>
        <Route path="/login" component={Login} onEnter={redirectToBack}/>
        <Route path="/register" component={Register} />
        <Route path="/personalpage" component={PersonalPage} />
        <Route path='/mydata' component={MyData} />
        <Route path='/myprestige' component={MyPrestige} />
        <Route path='/myattention' component={MyAttention} />
        <Route path='/myarticle' component={MyArticle} />
        <Route path='/hintverifyemail' component={HintVerifyEmail} />
        <Route path='/verifyemail' component={VerifyEmail} />
        <Route path="/write" component={WriteArticle} />
    </Route>
)


/*
    <Route path="/personal" component={PersonalPage}/>
    <Setting path="/setting" component={Setting} onEnter={redirectToLogin} />
    <Article path="/article/:id" component={Article} />
    <Route path="/write" component={WriteArticle} />
    <Admin path="/admin" component={Admin} onEnter={adminAuth}>
    <IndexRoute component={AdminPage} />
    <Route path="articles" component={AdminArticles} />
    <Route path="tags" component={AdminTags} />
    <Route path="comments" component={AdminComments} />
    <Route path="users" component={AdminUsers} />
    </Admin>

 */