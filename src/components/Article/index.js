// 文章详情页

import React from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as Actions from '../../actions'
import Content from './content'
import Like from './like'
import Comment from './comment'
import LoginModal from '../Login/modal'

const mapStateToProps = state =>{
    return {
        auth:state.auth.u_id,
        articleDetail:state.articleDetail.toJS(),
        //prenextArticle:state.prenextArticle.toJS(),
        commentList:state.commentList.toJS(),
    }
};

const mapDispatchToProps = dispatch => {
      return {
          actions:bindActionCreators(Actions,dispatch)
      }
};

@connect(mapStateToProps,mapDispatchToProps)
export default class Article extends React.Component{
    constructor(props){
        super(props);
        this.fetchArticleData = this.fetchArticleData.bind(this);
        this.toggleLike = this.toggleLike.bind(this);
        this.handleSubmitComment = this.handleSubmitComment.bind(this);
        this.handleSubmitReply = this.handleSubmitReply.bind(this);
        this.state = {
            showModal:false
        }
    }

    componentDidMount(){
        const {params:{t_id},actions} = this.props;
        this.fetchArticleData(t_id);
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.params.id !== this.props.params.id){
            this.fetchArticleData(nextProps.params.id);
        }
    }

    fetchArticleData(t_id){
        const {actions} = this.props;
        if(t_id){
            actions.getArticleDetail(t_id);
            actions.getCommentList(t_id);
        }
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

    closeLoginModal(){
        this.setState({
            showModal:false
        })
    }

    openLoginModal(){
        this.setState({
            showModal:true
        })
    }

    render(){
        const {articleDetail,commentList,auth} = this.props;

        return (
        <div>
            <div className="background">
            </div>
            <div className="outer-container">
                <div className="wrap-container">
                    <div className="content-outer">
                        <div className="content-inner">
                            <div className="article-box">
                                <Content articleDetail={articleDetail}/>
                                <Like likeCount={articleDetail.t_like}
                                      isLike={articleDetail.isLike}/>
                                <Comment commentList={commentList}
                                         auth={auth}
                                         submitComment={this.handleSubmitComment}
                                         submitReply={this.handleSubmitReply} o
                                         penLoginModal={this.openLoginModal.bind(this)}/>
                                <LoginModal isShowModal={this.state.showModal}
                                            closeModal={this.closeLoginModal.bind(this)}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        )
    }
}