// 文章详情页

import React from 'react';
import {connect} from 'react-redux';

import {API_ROOT} from '../../config';

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
        this.fetchArticleData = this.fetchArticleData.bind(this);
       // this.toggleLike = this.toggleLike.bind(this);
        this.handleSubmitComment = this.handleSubmitComment.bind(this);
        this.handleSubmitReply = this.handleSubmitReply.bind(this);
     //   this.state = {
      //      showModal:false
      //  }
    }

    componentDidMount(){
        this.fetchArticleData(localStorage.getItem('t_id'));
    }

    componentWillReceiveProps(nextProps){
        //if(nextProps.params.id !== this.props.params.id){
       //     this.fetchArticleData(nextProps.params.id);
       // }
    }

    fetchArticleData(t_id){
        let url = API_ROOT + 't/query';
        $.post(url,{t_id:t_id},
            function(data){
                localStorage.setItem('t_id',data.t_id);
                localStorage.setItem('t_title',data.t_title);
                localStorage.setItem('t_text',data.t_text);
                localStorage.setItem('t_date',data.t_date);
                localStorage.setItem('t_like',data.t_like);
                localStorage.setItem('t_comments',data.t_comments);
                localStorage.setItem('t_tags',data.t_tags);
                localStorage.setItem('t_date_latest',data.t_date_latest);
                localStorage.setItem('t_star',data.t_star);
                console.log('queryArticle:',data);
            })
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
       // this.setState({
       //     showModal:false
       // })
    }

    openLoginModal(){
     //   this.setState({
     //       showModal:true
     //   })
    }

    render(){
       // const {articleDetail,commentList,auth} = this.props;

        return (
        <div>
            <div className="background">
            </div>
            <div className="outer-container">
                <div className="wrap-container">
                    <div className="content-outer">
                        <div className="content-inner">
                            <div className="article-box">
                                <div className="article-container">
                                    <h1 className="title">{localStorage.getItem('t_title')}</h1>
                                    <div className="counts">
                                        <span className="views-count">
                                            收藏{localStorage.getItem('t_star')}
                                        </span>
                                        <span className="comments-count">
                                            评论{localStorage.getItem('t_comments')}
                                        </span>
                                        <span className="likes-count">
                                             喜欢{localStorage.getItem('articleDetail.t_like')}
                                        </span>
                                    </div>
                                    <div className="markdown-content">
                                         {localStorage.getItem('t_text')}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        )
    }
}