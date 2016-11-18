import React from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

import * as Actions from '../../actions'

import {formatDate} from '../../utiles'

const mapStateToProps =  (state) => {
    return {
        auth:state.auth.toJS(),
        articleDetail:state.articleDetail.toJS(),
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions:bindActionCreators(Actions,dispatch)
    }
};

@connect(mapStateToProps,mapDispatchToProps)
export default class UserArticles extends React.Component{
    constructor(props){
        super(props);
        this.deleteArticle = this.deleteArticle.bind(this)
    }

    componentDidMount(){
        const {actions,auth} = this.props;
        actions.getArticleList();
        actions.getArticleDetail();
    }

    deleteArticle(u_id,u_psw,t_id){
        const {actions} = this.props;
        actions.deleteArticle(u_id,u_psw,t_id);
    }


    render(){
        const style = {marginRight:'20px'};
        const {auth,articleDetail} = this.props;
        console.log('auth:',auth,'articleList:',articleDetail);

        return (
            <div className="col-sm-offset-2 col-sm-10">
                <div className="admin-articles" style={style}>
                    <table className="table table-striped table-hover">
                        <thead>
                        <tr>
                            <th>标题</th>
                            <th>写作时间</th>
                            <th>评论数</th>
                            <th>收藏数</th>
                            <th>喜爱数</th>
                            <th>操作</th>
                        </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{articleDetail.articleTitle}</td>
                                <td>{articleDetail.articleDate}</td>
                                <td>{articleDetail.articleComments}</td>
                                <td>{articleDetail.articleStar}</td>
                                <td>{articleDetail.articleLike}</td>
                                <td>
                                    <a href="#"
                                       className="btn btn-danger"
                                        onClick={this.deleteArticle(auth.userId,localStorage.getItem('u_psw'),articleDetail.articleId)}>
                                        <i className="fa fa-remove"> </i>
                                    </a>
                                </td>
                            </tr>
                        </tbody>
                        <Link to="/write"><i className="iconfont">&#xe622;</i>添加文章</Link>
                    </table>
                </div>
            </div>
        )
    }
}