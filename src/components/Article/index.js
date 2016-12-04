// 文章详情页

import React from 'react';
import {connect} from 'react-redux';
import $ from 'jquery';

import Alert from 'react-s-alert';
import Nav from '../HomeArticle/navbar';
import {API_ROOT} from '../../config';
import {defaultAvatar} from '../../assets/imgs/userimg.png';

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
            openedForm:null
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

    render(){
        return (
        <div className="home-container" >
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
                        <div className="markdown-content"
                             dangerouslySetInnerHTML={{__html:article.t_text}}>
                        </div>
                    </div>
                    <br />

                    <div className="comment-container clearfix">
                        { sessionStorage.getItem('u_id') === null
                            ?
                            <div>
                                <p className="comment-signin">
                                    <button className="btn btn-info"
                                            onClick={this.openLoginModal}>
                                        登录后发表评论
                                    </button>
                                </p>
                            </div>
                            :
                            <div className="comment-reply">
                                <a className="reply-avatar" href="#">
                                        <img src={ defaultAvatar}/>
                                </a>
                                <form className="comment-form"
                                      onSubmit={this.handleSubmit(submitComment)}>
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
        </div>
        )
    }
}