// 首页，获取全部文章

import React,{Component} from 'react'
import {Link,browserHistory} from 'react-router';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import $ from 'jquery';

import * as Actions from '../../actions';
import {customTime,formatDate} from '../../utiles';
import {API_ROOT} from '../../config';

import Tags from './tags';
import Nav from './navbar';
import Footer from './footer';
import ScrollTop from '../ScrollTop';

import Loading from '../../assets/imgs/tiny.gif';
import FocusImg1 from '../../assets/images/focus-img1.jpg';
import FocusImg2 from '../../assets/images/focus-img2.jpg';
import FocusImg3 from '../../assets/images/focus-img3.jpg';
import FocusImg4 from '../../assets/images/focus-img4.jpg';
import FocusImg5 from '../../assets/images/focus-img5.jpg';
import FocusImg6 from '../../assets/images/focus-img6.jpg';
import FocusImg7 from '../../assets/images/focus-img7.jpg';
import FocusImg8 from '../../assets/images/focus-img8.jpg';
import WrapperItem1 from '../../assets/images/wrapper-item1.png';
import WrapperItem2 from '../../assets/images/wrapper-item2.jpg';
import WrapperItem3 from '../../assets/images/wrapper-item3.jpg';
import WrapperItem4 from '../../assets/images/wrapper-item4.png';
import WrapperItem5 from '../../assets/images/wrapper-item5.png';
import RLoginIcon from '../../assets/images/r-login-icon.gif';

function mapStateToProps(state){
    return {
        tagList:state.tagList.toJS(),
        articleList:state.articleList.toJS(),
        articleDetail:state.articleDetail.toJS(),
        options:state.options.toJS(),
        auth:state.auth.toJS()
    }
}

function mapDispatchToProps(dispatch){
    return {
        actions:bindActionCreators(Actions,dispatch)
    }
}

@connect(mapStateToProps,mapDispatchToProps)
export default class Home extends Component{
    constructor(props){
        super(props);
        this.state={
            tagList:[],
            articleIds:'',
            articleDetail:[],
        }
    }

    componentDidMount(){
        console.log('component will mount,get the data first.');

        // 取到所有的tags
        let tagUrl = API_ROOT + 'public/tags';
        $.get(
            tagUrl,
            function (data) {
                console.log('is already get all tags:',data);
                this.setState({tagList:data});
                console.log('is already get all tags and set its tate:',this.state.tagList);
            }.bind(this)
        );

        this.handleClick()
    }

    // 取到所有的文章id
    handleClick(event,t_tags){
        let articleIdUrl = API_ROOT + 't/display';
        $.get(
            articleIdUrl,
            {t_tags:t_tags},
            function (data) {
                console.log('get all article ids by all tags:',data);
                this.setState({articleIds:data.t_ids});
                console.log('articleIds:',this.state.articleIds);
                let articleIds = this.state.articleIds.split('&');
                let articleIdsByHot = articleIds[0];
                let articlesByHot = articleIdsByHot.toString().split(',');
                console.log('articlesByHot:',articlesByHot);
                return this.getArticleDetails(articlesByHot)
            }.bind(this)
        );
    }

    // 取文章的详情
    getArticleDetails(articlesByHot){
        let articleDetailUrl = API_ROOT + 't/query';
        let articleDetail = new Array();
        for(let i=0; i<articlesByHot.length; i++){
            $.get(
                articleDetailUrl,
                {t_id:articlesByHot[i]},
                function (data) {
                    console.log('get all article details by their ids:',data);
                    articleDetail[i] = data;
                    console.log('get all article details and put them into the array:',articleDetail);
                    this.setState({articleDetail:articleDetail});
                    console.log('articleDetails:',this.state.articleDetail);
                }.bind(this)
            )
        }
    }

    handleChange(e,option,isAdd=false){
        e.preventDefault();
        const {actions} = this.props;
        actions.changeOptions(option);
    }

    logout(e){
        e.preventDefault();
        sessionStorage.removeItem('u_id','u_name');
        browserHistory.push('/');
    }

    render(){

        if(this.state.articleIds === ''){
            return(
                <div className="text-center home-container">
                    <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>                    <img src={Loading}/>
                </div>
            )
        }else {
            return (
                <div className="home-container">
                    <Nav /><br/><br/><br/><br/>
                    <div className="background"></div>
                    <div className="outer-container">
                        <div className="wrap-container">
                            <div className="content-outer">
                                <div className="content-inner">
                                    <div className="content">
                                        <div className="focus-page">
                                            <div className="con-left">
                                                <ul className="con-left-ul">
                                                    <li className="con-left-li">
                                                        <a href="">所有标签</a>
                                                        <div className="lesson-list-detail">
                                                            <div className="lesson-list-con">
                                                                <dl>
                                                                    <dt><a
                                                                        onClick={(event) => this.handleClick(event)}>所有标签</a>
                                                                    </dt>
                                                                    {
                                                                        this.state.tagList.map((tag, i) => {
                                                                            return (
                                                                                <dd key={i}>
                                                                                    <a onClick={(event) => this.handleClick(event, tag.toString())}>
                                                                                        {tag}
                                                                                    </a>
                                                                                </dd>
                                                                            )
                                                                        })
                                                                    }
                                                                </dl>
                                                            </div>
                                                        </div>
                                                    </li>
                                                    <li className="con-left-li">
                                                        <a onClick={(event) => this.handleClick(event, 'ios')}>ios</a>
                                                    </li>
                                                    <li className="con-left-li">
                                                        <a onClick={(event) => this.handleClick(event, 'android')}>android</a>
                                                    </li>
                                                    <li className="con-left-li">
                                                        <a onClick={(event) => this.handleClick(event, 'linux')}>linux</a>
                                                    </li>
                                                    <li className="con-left-li">
                                                        <a onClick={(event) => this.handleClick(event, 'windows')}>windows</a>
                                                    </li>
                                                    <li className="con-left-li">
                                                        <a onClick={(event) => this.handleClick(event, '后端开发')}>后端开发</a>
                                                    </li>
                                                    <li className="con-left-li">
                                                        <a onClick={(event) => this.handleClick(event, '前端开发')}>前端开发</a>
                                                    </li>
                                                    <li className="con-left-li">
                                                        <a onClick={(event) => this.handleClick(event, '数据库')}>数据库</a>
                                                    </li>
                                                    <li className="con-left-li">
                                                        <a onClick={(event) => this.handleClick(event, '云计算')}>云计算</a>
                                                    </li>
                                                    <li className="con-left-li">
                                                        <a onClick={(event) => this.handleClick(event, '服务器')}>服务器</a>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className="con-mid">
                                                <div className="focus-con">
                                                    <span className="left-btn"> </span>
                                                    <span className="right-btn"> </span>
                                                    <div className="focus-img">
                                                        <a href=""><img src={FocusImg1} alt=""/></a>
                                                        <a href=""><img src={FocusImg2} alt=""/></a>
                                                        <a href=""><img src={FocusImg3} alt=""/></a>
                                                        <a href=""><img src={FocusImg4} alt=""/></a>
                                                        <a href=""><img src={FocusImg5} alt=""/></a>
                                                        <a href=""><img src={FocusImg6} alt=""/></a>
                                                        <a href=""><img src={FocusImg7} alt=""/></a>
                                                        <a href=""><img src={FocusImg8} alt=""/></a>
                                                    </div>
                                                    <div className="focus-num">
                                                    </div>
                                                </div>
                                                <div className="focus-wrapper">
                                                    <div className="focus-item">
                                                        <span className="s-focus-left-btn"> </span>
                                                        <span className="s-focus-right-btn"> </span>
                                                        <ul className="items-ul">
                                                            <li>
                                                                <a href=""><img src={WrapperItem1} alt=""/>
                                                                    <p>iOS相关话题</p>
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a href=""><img src={WrapperItem2} alt=""/>
                                                                    <p>JavaWeb相关话题</p>
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a href=""><img src={WrapperItem3} alt=""/>
                                                                    <p>后端相关话题</p>
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a href=""><img src={WrapperItem4} alt=""/>
                                                                    <p>HTML5/Web相关话题</p>
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a href=""><img src={WrapperItem5} alt=""/>
                                                                    <p>Android相关话题</p>
                                                                </a>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="con-right">
                                                <div className="right-news">
                                                    <h3>论坛公告</h3>
                                                    <ul className="news-ul">
                                                        <li><a href="">实验班问答交流平台开放通知</a></li>
                                                        <li className="items"><a href="">本平台的使用指南，可以不看</a></li>
                                                        <li className="bolder-item"><a href="">给点建议，让本平台变得更好</a></li>
                                                        <li className="items"><a href="">使用的技术，有兴趣可以了解一下</a></li>
                                                    </ul>
                                                </div>
                                                <div className="right-login">
                                                    <div className="r-user-con">
                                                        <img src={RLoginIcon} alt=""/>
                                                    </div>
                                                    {
                                                        sessionStorage.getItem('u_id') === null
                                                            ?
                                                            <div className="r-user-login">
                                                                <div className="hello-word">
                                                                    <span>Hi!你好</span>
                                                                    <p>这是实验班问答交流平台</p>
                                                                </div>
                                                                <div className="login-btn-con">
                                                                    <Link to="/login" className="login-btn">登录</Link>
                                                                    <Link to="/register" className="register">注册</Link>
                                                                </div>
                                                            </div>
                                                            :
                                                            <div className="r-user-login">
                                                                <div className="hello-word">
                                                                    <span>Hi!你好</span>
                                                                    <p>这是实验班问答交流平台</p>
                                                                </div>
                                                                <div className="login-btn-con">
                                                                    <a href="" className="login-btn"
                                                                       onClick={e => this.logout(e)}>退出</a>
                                                                </div>
                                                            </div>
                                                    }
                                                </div>
                                                <br />
                                                <ul className="news-ul text-center">
                                                    <li className=""><a href="">(1)可以显示一些固定的通知</a></li>
                                                    <li className="items"><a href="">(2)或者显示活跃的用户排行</a></li>
                                                    <li className=""><a href="">(3)也可以是还能添加的功能</a></li>
                                                    <li className="items"><a href="">(4)还可以是正在挖掘的技术</a></li>
                                                    <li className=""><a href="">(5)可以加些有所帮助的内容</a></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <br /><br />
                                    <div className="live-lesson">
                                        <div className="live-img">
                                            <a href=""> article </a>
                                        </div>
                                        <ul className="article-list list-unstyled clearfix">
                                            {
                                                this.state.articleDetail!==[] &&
                                                this.state.articleDetail.map((article, i) => {
                                                    return (
                                                        <li className="article-item"
                                                            key={i}>
                                                            <div className="articleList-item">
                                                                <p className="list-top">
                                                    <span className="time">
                                                        {formatDate(article.t_date_latest)}
                                                    </span>
                                                                </p>
                                                                <h2 className="title">
                                                                    <strong>
                                                                        <Link to={'/article/' + article.t_id}
                                                                              className="link-title">
                                                                            {article.t_title}
                                                                        </Link>
                                                                    </strong>
                                                                </h2>
                                                                <p className="list-footer">
                                                    <span className="visit-count">
                                                        收藏 {article.t_star}
                                                    </span>&nbsp;&nbsp;
                                                                    <span className="comment-count">
                                                        评论 {article.t_comments}
                                                    </span>&nbsp;&nbsp;
                                                                    <span className="like-count">
                                                        喜欢 {article.t_like}
                                                    </span>&nbsp;&nbsp;
                                                                    <span>
                                                        标签{article.t_tags}&nbsp;
                                                    </span>
                                                                    <br/>
                                                                    <Link to=""/>
                                                                </p>
                                                            </div>
                                                            <br/><br/>
                                                        </li>
                                                    )
                                                })
                                            }
                                        </ul>
                                    </div>
                                    <br /><br />
                                </div>
                            </div>
                        </div>
                    </div>
                    <ScrollTop/><Footer/>
                </div>
            )
        }
    }
}