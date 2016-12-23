// 文章详情页

import React from 'react';
import {connect} from 'react-redux';
import {Link,browserHistory } from 'react-router';
import $ from 'jquery';
import Alert from 'react-s-alert';

import markIt from'../WriteArticle/marked';
import Nav from '../HomeArticleHot/navbar';
import Footer from '../HomeArticleHot/footer';
import ScrollTop from '../ScrollTop'

import {API_ROOT} from '../../config';
import {customTime,formatDate} from '../../utiles';

import {defaultAvatar} from '../../assets/imgs/userimg.png';

export default class Article extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            key:'',
            article:[],
            articleComment:[],
            commentContent:'',
            commentUser:[],
            articleAuth:'',
            isLike:'',
            isRecommend:'',
            showModal:false,
            openedForm:null,
            u_loginname: '',
            u_psw:'',
            u_loginname_error_text:null,
            u_psw_error_text:null,
            disabled: true,
        }
    }

    componentDidMount(){
        // 获取密钥
        let url = API_ROOT + 'safe/secret_key';
        $.get(url,
            function (data) {
                this.setState({key:data});
             //   console.log('key:',this.state.key);
            }.bind(this));

        // 获取传值过来的文章id
        const {params:{id}} = this.props;
        console.log('article id:',id);
        this.fetchArticleData(id);
    }

    // 获取文章详情
    fetchArticleData(t_id){
        let url = API_ROOT + 't/query';
        let authUrl = API_ROOT + 'u/query';
        let likeUrl = API_ROOT + 't/query_pro';

        let u_id = sessionStorage.getItem('u_id');
        let u_psw = sessionStorage.getItem('u_psw');

        let article = new Array();

        // 通过传值的id获取文章详情，data.t_comments have some problems;
        $.get(
            url,
            {t_id:t_id},
            function(data){
                console.log('get article details by its certain id:',data);
                article[0] = data;
                this.setState({article:article});

                // 存储获取到的文章作者id
                $.get(authUrl,{u_id:data.u_id},
                    function (data) {
                        this.setState({articleAuth:data.u_name});
                }.bind(this));
                console.log('get this article detail message:',this.state.article);

                let commentIds = data.t_comments.split(',');
                console.log('article comments ids:',commentIds);
                return this.fetchArticleCommentsDetail(commentIds);
            }.bind(this)
            );

        // 确定当前用户与本篇文章的关系
        $.post(
            likeUrl,
            {t_id:t_id,u_id:u_id,u_psw:u_psw,secret_key:this.state.key},
            function (data) {
                console.log('get article and user relationshape:',data);
                if(data.t_recommend_bool == 1){
                    this.setState({isLike:'1'})
                }else {
                    this.setState({isLike:'0'})
                }
                if(data.t_star_bool == 1){
                    this.setState({isRecommend:'1'})
                }else {
                    this.setState({isRecommend:'0'})
                }
            }.bind(this)
        )
    }

  /*  fetchArticleComments(){
        console.log('articleComment:',this.state.article[0].t_comments);
        let commentIds = this.state.article[0].t_comments.split(',');
        console.log('article comments ids:',commentIds);
        return this.fetchArticleCommentsDetail(commentIds);
    }*/

    // 获取文章评论详情
    fetchArticleCommentsDetail(commentIds){
        let url = API_ROOT + 'c/query';
        let userUrl = API_ROOT + 'u/query';

        let articleComment = new Array();
        let commentUser = new Array();

        for(let i=0; i<commentIds.length; i++){
            $.get(
                url,
                {c_id:commentIds[i]},
                function (data) {
                    console.log('get all comments details by their ids:',data);
                    articleComment[i] = data;
                    console.log('get all article details and put them into the array:',articleComment,);

                    // 获取某条评论的用户
                    let u_id = data.u_id;
                    $.get(
                        userUrl,
                        {u_id:u_id},
                        function (data) {
                            commentUser[i] = data.u_name;
                            this.setState({commentUser:commentUser});
                            console.log('commentUser:',this.state.commentUser);
                        }.bind(this)
                    );
                    this.setState({articleComment:articleComment});
                    console.log('articleDetails:',this.state.articleComment,'commentUser:',this.state.commentUser);
                }.bind(this)
            )
        }
    }

 /*   fecthCommentUser(u_id,i){
        let url = API_ROOT + 'u/query';
        let commentUser = new Array();
        $.get(
            url,
            {u_id:u_id},
            function (data) {
                commentUser[i] = data.u_name;
                this.setState({commentUser:commentUser});
                console.log('commentUser:',this.state.commentUser);
            }.bind(this)
        );
    }*/

    // 添加评论
    addComment(u_id,u_psw,ec_type,ec_id,c_text){
        let url = API_ROOT + 'c/add';
        $.post(
            url,
            {u_id:u_id,u_psw:u_psw,ec_type:ec_type,ec_id:ec_id,c_text:c_text,secret_key:this.state.key},
            function (data) {
                console.log('add comment:', data);
                if (data.code == 1) {
                    console.log('article id:',ec_id);
                    let content = '评论成功';
                    let type = 'success';
                    if (content !== '' && type) {
                        switch (type) {
                            case 'error':
                                Alert.error(content);
                                break;
                            case 'success':
                                Alert.success(content);
                                break;
                            case 'info':
                                Alert.info(content);
                                break;
                            case 'warning':
                                Alert.warning(content);
                                break;
                            default:
                                Alert.error(content)
                        }
                    }
                    this.fetchArticleData(ec_id);
                } else {
                    let content = data.codeState;
                    let type = 'error';
                    if (content !== '' && type) {
                        switch (type) {
                            case 'error':
                                Alert.error(content);
                                break;
                            case 'success':
                                Alert.success(content);
                                break;
                            case 'info':
                                Alert.info(content);
                                break;
                            case 'warning':
                                Alert.warning(content);
                                break;
                            default:
                                Alert.error(content)
                        }
                    }
                }
            })
    }

    // 处理添加评论的按钮事件
    handleSubmitComment(e){
        e.preventDefault();
        const {params:{id}} = this.props;
        let u_id = sessionStorage.getItem('u_id');
        let u_psw = sessionStorage.getItem('u_psw');
        let ec_type = 'article';
        let ec_id = id;
        let c_text = this.state.commentContent;
        console.log('commentContent:',this.state.commentContent);
        this.addComment(u_id,u_psw,ec_type,ec_id,c_text);
    }

    // 喜欢一篇文章
    likeArticle(e){
        const {params:{id}} = this.props;
        let url = API_ROOT + 't/recommend';
        let u_id = sessionStorage.getItem('u_id');
        let u_psw = sessionStorage.getItem('u_psw');
        let t_id = id;
        let u_act = '1';
        $.post(
            url,
            {u_id:u_id,u_psw:u_psw,t_id:t_id,u_act:u_act,secret_key:this.state.key},
            function (data) {
                console.log('like article:',data);
                if(data.code == 1){
                    this.setState({isLike:true})
                }else {
                    let content = '您的声望值不够';
                    let type = 'warning';
                    if (content !== '' && type) {
                        switch (type) {
                            case 'error':
                                Alert.error(content);
                                break;
                            case 'success':
                                Alert.success(content);
                                break;
                            case 'info':
                                Alert.info(content);
                                break;
                            case 'warning':
                                Alert.warning(content);
                                break;
                            default:
                                Alert.error(content)
                        }
                    }
                }
            }.bind(this)
        )
    }

    // 取消喜欢一篇文章
    unLikeArticle(e){
        const {params:{id}} = this.props;
        let url = API_ROOT + 't/recommend';
        let u_id = sessionStorage.getItem('u_id');
        let u_psw = sessionStorage.getItem('u_psw');
        let t_id = id;
        let u_act = '0';
        $.post(
            url,
            {u_id:u_id,u_psw:u_psw,t_id:t_id,u_act:u_act,secret_key:this.state.key},
            function (data) {
                console.log('unlike article:',data);
                if(data.code == 1){
                    this.setState({isLike:false})
                }
            }.bind(this)
        )
    }

    // 收藏一篇文章
    starArticle(e){
        const {params:{id}} = this.props;
        let url = API_ROOT + 't/star';
        let u_id = sessionStorage.getItem('u_id');
        let u_psw = sessionStorage.getItem('u_psw');
        let t_id = id;
        let u_act = '1';
        $.post(
            url,
            {u_id:u_id,u_psw:u_psw,t_id:t_id,u_act:u_act,secret_key:this.state.key},
            function (data) {
                console.log('like article:',data);
                if(data.code == 1){
                    this.setState({isRecommend:true})
                }else {
                    let content = data.codeState;
                    let type = 'warning';
                    if (content !== '' && type) {
                        switch (type) {
                            case 'error':
                                Alert.error(content);
                                break;
                            case 'success':
                                Alert.success(content);
                                break;
                            case 'info':
                                Alert.info(content);
                                break;
                            case 'warning':
                                Alert.warning(content);
                                break;
                            default:
                                Alert.error(content)
                        }
                    }
                }
            }.bind(this)
        )
    }

    // 取消收藏一篇文章
    unStarArticle(e){
        const {params:{id}} = this.props;
        let url = API_ROOT + 't/star';
        let u_id = sessionStorage.getItem('u_id');
        let u_psw = sessionStorage.getItem('u_psw');
        let t_id = id;
        let u_act = '0';
        $.post(
            url,
            {u_id:u_id,u_psw:u_psw,t_id:t_id,u_act:u_act,secret_key:this.state.key},
            function (data) {
                console.log('unlike article:',data);
                if(data.code == 1){
                    this.setState({isRecommend:false})
                }
            }.bind(this)
        )
    }

    // 添加回复
    handleSubmitReply(e,c_id,content){
        e.preventDefault();
        const {actions} = this.props;
        actions.addReply(c_id,{content})
    }
    handleSubmit(submitComment){
        return (e) =>{
            submitComment(e,this.state.commentContent);
            this.setState({
                commentContent:''
            })
        }
    }

    // 获取文本框内的值得变化
    handleCommentContentChange(e){
        e.preventDefault();
        this.setState({
            commentContent:e.target.value
        })
    }

    // 登录后评论，打开登录表单
    closeLoginModal(e){
        this.setState({
            showModal:false
        })
    }
    openLoginModal(){
        this.setState({
            showModal:true
        })
    }

    // 清空文本
    clearText(e){
        e.preventDefault();
        this.setState({
            commentContent:''
        })
    }

    // 判断是否可以是按钮可用
    isDisabled(){
        let u_loginname_is_valid = false;
        let u_psw_is_valid = false;

        if(this.state.u_loginname === ''){
            this.setState({
                u_loginname_error_text:'请输入用户名或邮箱',
            });
        }
        else {
            u_loginname_is_valid = true;
            this.setState({
                u_loginname_error_text:null,
            });
        }

        if (this.state.u_psw === ''){
            this.setState({
                u_psw_error_text:'请输入密码',
            });
        }
        else {
            u_psw_is_valid = true;
            this.setState({
                u_psw_error_text:null
            })
        }

        if (u_loginname_is_valid && u_psw_is_valid) {
            this.setState({
                disabled:false,
            });
        }

    }

    // 获取文本框内的值得变化
    changeValue(e,type) {
        const value = e.target.value;
        const next_state = {};
        next_state[type] = value;
        this.setState(next_state,() => {
            this.isDisabled();
        });
    }

    // 本页面用户登录
    loginUser(u_loginname,u_psw) {
        let url = API_ROOT + 'sign_in';
        sessionStorage.setItem('u_psw',u_psw);
        $.post(url,{u_loginname:u_loginname,u_psw:u_psw,secret_key:this.state.key},
            function(data){
                console.log('userLogin',data);
                if(data.code == 1) {
                    sessionStorage.setItem('u_id',data.u_id);
                    sessionStorage.setItem('u_name',data.u_name);
                    sessionStorage.setItem('u_email',data.u_email);
                    sessionStorage.setItem('u_email_confirm',data.u_email_confirm);
                    sessionStorage.setItem('u_level',data.u_level);
                    sessionStorage.setItem('u_reputation',data.u_reputation);
                    sessionStorage.setItem('u_realname',data.u_realname);
                    sessionStorage.setItem('u_blog',data.u_blog);
                    sessionStorage.setItem('u_github',data.u_github);
                    sessionStorage.setItem('u_articles',data.u_articles);
                    sessionStorage.setItem('u_questions',data.u_questions);
                    sessionStorage.setItem('u_answers',data.u_answers);
                    sessionStorage.setItem('u_watchusers',data.u_watchusers);
                    sessionStorage.setItem('u_tags',data.u_tags);
                    sessionStorage.setItem('u_intro',data.u_intro);
                }else {
                    let content = data.codeState;
                    let type = 'error';
                    if(content !== '' && type) {
                        switch (type) {
                            case 'error':
                                Alert.error(content);
                                break;
                            case 'success':
                                Alert.success(content);
                                break;
                            case 'info':
                                Alert.info(content);
                                break;
                            case 'warning':
                                Alert.warning(content);
                                break;
                            default:
                                Alert.error(content)
                        }
                    }
                }})
    }
    login(e) {
        e.preventDefault();
        this.loginUser(this.state.u_loginname,this.state.u_psw);
    }

    render(){
        return (
        <div className="home-container" >
            <Alert stack={{limit:1}} position='top-right' timeout={3000}/>
            <Nav/>
            {
            this.state.article.map((article, i) => {
                return(
                <div className="outer-container" key={i}><div className="wrap-container"><div className="content-outer"><div className="content-inner"><div className="article-box">
                    <div className="article-container">
                        <h1 className="title">
                            {article.t_title}
                        </h1>
                            {
                                sessionStorage.getItem('u_id') === null ?
                                    <div>
                                    </div>
                                    :
                                    <div>
                                        {
                                            this.state.isRecommend == '' ?
                                                <button> </button>
                                                :
                                                <div>
                                                    {
                                                        this.state.isRecommend == '1' ?
                                                            <button className='btn-success btn pull-right'
                                                                    onClick={(e) => this.unStarArticle(e)}>
                                                                <p>&nbsp;&nbsp;取消收藏&nbsp;&nbsp;</p>
                                                            </button>
                                                            :
                                                            <button className='btn-success btn pull-right'
                                                                    onClick={(e) => this.starArticle(e)}>
                                                                <p>&nbsp;&nbsp;收藏&nbsp;&nbsp;</p>
                                                            </button>
                                                    }
                                                </div>
                                        }
                                    </div>
                            }
                        <div className="counts">
                            <span className="views-count">
                                作者&nbsp;&nbsp;{this.state.articleAuth}
                            </span>&nbsp;
                            <span className="views-count">
                                收藏&nbsp;&nbsp;{article.t_star}
                            </span>&nbsp;
                            <span className="comments-count">
                                喜欢&nbsp;&nbsp;{article.t_like}
                            </span>&nbsp;
                            <span className="comments-count">
                                标签&nbsp;&nbsp;{article.t_tags}
                            </span>&nbsp;
                            <span className="likes-count">
                                {formatDate(article.t_date_latest)}
                            </span>
                        </div>
                        <div className="markdown-content">
                            <br/>
                            <div className="detail-content" dangerouslySetInnerHTML={{__html: markIt(article.t_text)}}></div>
                        </div>
                    </div>
                    <br />
                    <br />
                    {
                        this.state.article[0].t_comments == '' ?
                            <div>
                                <div className="comment-des clearfix">
                                    0条评论
                                    <hr/>
                                </div>
                            </div>
                            :
                            <div>
                                <div className="comment-des clearfix">
                                    {this.state.articleComment.length}条评论
                                    <hr/>
                                </div>
                                {
                                    this.state.articleComment.map((comment,i) => {
                                        return(
                                            <div>
                                                <br/>
                                                <div className="content-shelf-comments"
                                                     key={i}>
                                                    <p className="span6-h"><i className="iconfont span6-icon">&#xe639;</i>&nbsp;{this.state.commentUser[i]}</p>
                                                    <br/><p className="span6-p">{comment.c_text}</p>
                                                    <br/>
                                                    <span className="span5 pull-right">
                                                        <a><i className="iconfont">&#xe617;</i></a>&nbsp;&nbsp;&nbsp;&nbsp;
                                                        <a><i className="iconfont">&#xe61e;</i></a>&nbsp;&nbsp;&nbsp;&nbsp;
                                                        评论时间 {formatDate(comment.c_date)}</span>&nbsp;&nbsp;
                                                    <br/><br/>
                                                </div>
                                            </div>
                                        )
                                    })}
                            </div>
                    }
                    <div className="comment-container clearfix">
                        { sessionStorage.getItem('u_id') === null
                            ?
                            <p className="comment-signin">
                                <button className="btn-info btn text-center">
                                    登录后才能评论
                                </button>
                            </p>
                            :
                            <div>

                                <div className="article-like">
                                    {
                                        this.state.isLike == '1' ?
                                            <a className='liked-btn' onClick={(e)=>this.unLikeArticle(e)}>
                                                <i className="iconfont">&#xe616;</i><p>取消</p>
                                            </a>
                                            :
                                            <a className='liked-btn' onClick={(e)=>this.likeArticle(e)}>
                                                <i className="iconfont">&#xe617;</i><p>赞</p>
                                            </a>
                                    }
                                </div>
                                <br />
                                <br />

                            <div className="comment-reply">
                                <a className="reply-avatar" href="">
                                        <img src={ defaultAvatar}/>
                                </a>
                                <form className="comment-form">
                                    <div className="comment-content">
                                    <textarea
                                        maxLength="1000"
                                        required
                                        placeholder="写下你的评论…"
                                        ref="cText"
                                        onChange={(e) => this.handleCommentContentChange(e)}>
                                    </textarea>
                                    </div>
                                    <div className="button-container clearfix">
                                        <button type="submit"
                                               className="btn btn-info pull-right"
                                                onClick={(e)=>this.handleSubmitComment(e)}>
                                            发表
                                        </button>
                                        <button className="btn btn-warning pull-right"
                                                onClick={(e)=>this.clearText(e)}>
                                            清空
                                        </button>
                                    </div>
                                </form>
                            </div>
                            </div>
                        }
                    </div>
                </div></div></div></div></div>)
            })}
            <ScrollTop/>
            <Footer/>
        </div>
        )
    }
}