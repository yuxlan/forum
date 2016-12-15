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

const mapStateToProps = state =>{
    return {
        //  auth:state.auth.u_id,
        //  articleDetail:state.articleDetail.toJS(),
        //  prenextArticle:state.prenextArticle.toJS(),
        //  commentList:state.commentList.toJS(),
    }
};

const mapDispatchToProps = dispatch => {
    return {
        //     actions:bindActionCreators(Actions,dispatch)
    }
};

@connect(mapStateToProps,mapDispatchToProps)
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
            isLike:false,
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
                console.log('key:',this.state.key);
            }.bind(this));

        // 获取传值过来的文章id
        const {params:{id}} = this.props;
        console.log('article id:',id);
        this.fetchArticleData(id);
    }

    // 获取文章详情
    fetchArticleData(q_id){
        let url = API_ROOT + 'q/query';
        let authUrl = API_ROOT + 'u/query';
        let likeUrl = API_ROOT + 'q/query_pro';

        let u_id = sessionStorage.getItem('u_id');
        let u_psw = sessionStorage.getItem('u_psw');

        let article = new Array();

        $.get(
            url,
            {q_id:q_id},
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

                let answerIds = data.q_answers.split(',');
                console.log('article comments ids:',answerIds);
                return this.fetchArticleCommentsDetail(answerIds);
            }.bind(this)
        );

        // 确定当前用户与本篇文章的关系
        $.post(
            likeUrl,
            {t_id:q_id,u_id:u_id,u_psw:u_psw,secret_key:this.state.key},
            function (data) {
                console.log('get article and user relationshape:',data);
                if(data.q_like_state == 1){
                    this.setState({isLike:true})
                }else {
                    this.setState({isLike:false})
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

    // 获取问题回答详情
    fetchArticleCommentsDetail(answerIds){
        let url = API_ROOT + 'a/query';
        let userUrl = API_ROOT + 'u/query';

        let articleComment = new Array();
        let commentUser = new Array();

        for(let i=0; i<answerIds.length; i++){
            $.get(
                url,
                {c_id:answerIds[i]},
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

    // 添加答案
    addComment(u_id,u_psw,ec_type,ec_id,c_text){
        let url = API_ROOT + 'a/add';
        $.post(
            url,
            {u_id:u_id,u_psw:u_psw,q_id:ec_id,a_text:c_text,secret_key:this.state.key},
            function (data) {
                console.log('add comment:', data);
                if (data.code == 1) {
                    console.log('article id:',ec_id);
                    let content = '回答成功';
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
                    return this.fetchArticleData(ec_id);
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
        let url = API_ROOT + 'q/star';
        let u_id = sessionStorage.getItem('u_id');
        let u_psw = sessionStorage.getItem('u_psw');
        let t_id = id;
        let u_act = '1';
        $.post(
            url,
            {u_id:u_id,u_psw:u_psw,q_id:t_id,u_act:u_act,secret_key:this.state.key},
            function (data) {
                console.log('like article:',data);
                if(data.code == 1){
                    this.setState({isLike:true})
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

    // 取消喜欢一篇文章
    unLikeArticle(e){
        const {params:{id}} = this.props;
        let url = API_ROOT + 'q/star';
        let u_id = sessionStorage.getItem('u_id');
        let u_psw = sessionStorage.getItem('u_psw');
        let t_id = id;
        let u_act = '0';
        $.post(
            url,
            {u_id:u_id,u_psw:u_psw,q_id:t_id,u_act:u_act,secret_key:this.state.key},
            function (data) {
                console.log('unlike article:',data);
                if(data.code == 1){
                    this.setState({isLike:false})
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
                                        {article.q_title}
                                    </h1>
                                    <div className="counts">
                            <span className="views-count">
                                作者&nbsp;&nbsp;{this.state.articleAuth}
                            </span>&nbsp;
                                        <span className="views-count">
                                收藏&nbsp;&nbsp;{article.q_star}
                            </span>&nbsp;
                                        <span className="comments-count">
                                喜欢&nbsp;&nbsp;{article.q_like}
                            </span>&nbsp;
                                        <span className="comments-count">
                                标签&nbsp;&nbsp;{article.q_tags}
                            </span>&nbsp;
                                        <span className="likes-count">
                                {formatDate(article.q_date_latest)}
                            </span>
                                    </div>
                                    <div className="markdown-content">
                                        <br/>
                                        <div dangerouslySetInnerHTML={{__html: markIt(article.q_text)}}></div>
                                        <br/>
                                    </div>
                                </div>
                                <br />
                                <br />
                                {
                                    this.state.article[0].q_answers = '' ?
                                        <div>
                                            <div className="comment-des clearfix">
                                                0条回答
                                            </div>
                                        </div>
                                        :
                                        <div>
                                            <div className="comment-des clearfix">
                                                {this.state.articleComment.length}条回答
                                            </div>
                                            {
                                                this.state.articleComment.map((comment,i) => {
                                                    return(
                                                        <div>
                                                            <br/>
                                                            <br/>
                                                            <div className="content-shelf-comments"
                                                                 key={i}>
                                                                <p className="span6-h"><i className="iconfont span6-icon">&#xe639;</i>&nbsp;{this.state.commentUser[i]}</p>
                                                                <br/><p className="span6-p">{comment.a_text}</p>
                                                                <br/>
                                                                <span className="span5 pull-right"><i className="iconfont">&#xe617;</i>&nbsp;&nbsp;&nbsp;&nbsp;回答时间 {formatDate(comment.a_date)}</span>&nbsp;&nbsp;
                                                                <br/><br/>
                                                            </div>
                                                            <br/>
                                                            <br/>
                                                        </div>
                                                    )
                                                })}
                                        </div>
                                }

                                <div className="comment-container clearfix">
                                    { sessionStorage.getItem('u_id') === null
                                        ?
                                            <div className='panel panel-default width'>
                                                <div className='panel-body'>
                                                    <form className="form" method="post">
                                                        <div className="form-group">
                                                            <input type="text"
                                                                   className='form-control'
                                                                   ref="u_loginname"
                                                                   placeholder='输入用户名或邮箱'
                                                                   onChange={(e) => this.changeValue(e,'u_loginname')}/>
                                                        </div>
                                                        <div className="form-group">
                                                            <input type="password"
                                                                   className='form-control'
                                                                   ref="u_psw"
                                                                   placeholder='输入密码'
                                                                   onChange={(e) => this.changeValue(e,'u_psw')}/>
                                                        </div>
                                                        <p className="comment-signin">
                                                            <button className="btn-info btn register-login-btn"
                                                                    type="submit"
                                                                    disabled={this.state.disabled}
                                                                    onClick={(e) => this.login(e)}>
                                                                登录后才能回答
                                                            </button>
                                                        </p>
                                                    </form>
                                                </div>
                                            </div>
                                        :
                                        <div>

                                            <div className="article-like">
                                                {
                                                    this.state.isLike ?
                                                        <a className='liked-btn' onClick={(e)=>this.unLikeArticle(e)}>
                                                            <i className="iconfont">&#xe616;</i>
                                                        </a>
                                                        :
                                                        <a className='liked-btn' onClick={(e)=>this.likeArticle(e)}>
                                                            <i className="iconfont">&#xe617;</i>
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
                                        required
                                        placeholder="回答…"
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