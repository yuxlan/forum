// 文章详情页

import React from 'react';
import {connect} from 'react-redux';
import $ from 'jquery';
import markIt from'../WriteArticle/marked';

import Alert from 'react-s-alert';
import Nav from '../HomeArticle/navbar';
import Footer from '../HomeArticle/footer';
import {API_ROOT} from '../../config';
import {defaultAvatar} from '../../assets/imgs/userimg.png';
import {Link,browserHistory } from 'react-router';
import ScrollTop from '../ScrollTop'

const mapStateToProps = state =>{
    return {
      /*  auth:state.auth.u_id,
        articleDetail:state.articleDetail.toJS(),
        prenextArticle:state.prenextArticle.toJS(),
        commentList:state.commentList.toJS(),*/
    }
};

const mapDispatchToProps = dispatch => {
      return {
       //   actions:bindActionCreators(Actions,dispatch)
      }
};

@connect(mapStateToProps,mapDispatchToProps)
export default class Article extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            article:[],
            showModal:false,
            commentContent:'',
            openedForm:null,
            u_loginname: '',
            u_psw:'',
            u_loginname_error_text:null,
            u_psw_error_text:null,
            disabled: true,
        }
    }

    componentDidMount(){
        const {params:{id}} = this.props;
        console.log('article id:',id);
        this.fetchArticleData(id);
    }

    fetchArticleData(t_id){
        let article = new Array();
        let url = API_ROOT + 't/query';
        $.get(
            url,
            {t_id:t_id},
            function(data){
                console.log('get article details by its certain id:',data);
                article[0] = data;
                this.setState({article:article});
                console.log('get this article detail message:',this.state.article);
            }.bind(this)
            )
    }

    handleSubmitComment(e,content){
        e.preventDefault();
        const {actions} = this.props;
        actions.addComment({
            c_id:c_id,
            content:content
        })
    }

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

    handleCommentContentChange(e){
        this.setState({
            commentContent:e.target.value
        })
    }

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

    clearText(e){
        e.preventDefault();
        this.setState({
            commentContent:''
        })
    }

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

    changeValue(e,type) {
        const value = e.target.value;
        const next_state = {};
        next_state[type] = value;
        this.setState(next_state,() => {
            this.isDisabled();
        });
    }

    loginUser(u_loginname,u_psw) {
        let url = API_ROOT + 'sign_in';
        sessionStorage.setItem('u_psw',u_psw);
        $.post(url,{u_loginname:u_loginname,u_psw:u_psw},
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
                    browserHistory.push('/');
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
        // const {actions} = this.props;
        // actions.loginUser(this.state.u_loginname,this.state.u_psw, this.state.redirectTo);
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
                        <div className="counts">
                                        <span className="views-count">
                                            收藏{article.t_star}
                                        </span>
                            <span className="comments-count">
                                            评论{article.t_comments}
                                        </span>
                            <span className="likes-count">
                                            喜欢{article.t_like}
                                        </span>
                        </div>
                        <div className="markdown-content">
                            <br/>
                            &nbsp; &nbsp; &nbsp; &nbsp;<div dangerouslySetInnerHTML={{__html: markIt(article.t_text)}}></div>
                            <br/>
                        </div>
                    </div>
                    <br />
                    <br />

                    <div className="article-like">
                        <a href="javascript:;" className='liked-btn'>
                            <i className="fa fa-thumbs-up"> </i>
                        </a>
                    </div>
                    <br />
                    <br />

                    <div className="comment-container clearfix">
                        { sessionStorage.getItem('u_id') === null
                            ?
                            <div>
                                <p className="comment-signin">
                                    <button className="btn btn-info login">
                                        登录后发表评论
                                    </button>
                                </p>
                            </div>
                            :
                            <div className="comment-reply">
                                <a className="reply-avatar" href="#">
                                        <img src={ defaultAvatar}/>
                                </a>
                                <form className="comment-form">
                                    <div className="comment-content">
                                    <textarea
                                        maxLength="1000"
                                        required
                                        placeholder="写下你的评论…"
                                        onChange={this.handleCommentContentChange}
                                        id="comment_content"
                                        value={this.state.commentContent}>
                                    </textarea>
                                    </div>
                                    <div className="button-container clearfix">
                                        <input type="submit"
                                               id="comment_submit_btn"
                                               value="发 表"
                                               className="btn btn-info pull-right" />
                                        <button className="btn btn-danger pull-right"
                                                onClick={this.clearText}>
                                            清空
                                        </button>
                                    </div>
                                </form>
                            </div>
                        }
                        <div className="comment-des clearfix">
                            {article.t_comments || 0}条评论
                        </div>
                    </div>
                </div></div></div></div></div>)
            })}
            <ScrollTop/>
            <Footer/>
        </div>
        )
    }
}