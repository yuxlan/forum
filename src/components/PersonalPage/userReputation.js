import React from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

import * as Actions from '../../actions'

const mapStateToProps =  (state) => {
    return {
        auth:state.auth.toJS(),
        adminQueryReputation:state.adminQueryReputation.toJS(),
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
        this.queryReputation = this.queryReputation.bind(this);
    }

    componentDidMount(){

    }

    queryReputation(u_id,u_psw){
        const {actions} = this.props;
        actions.queryReputationHistory(u_id,u_psw);
    }

    render(){
        const style = {marginRight:'20px'};
        const {auth,adminQueryReputation} = this.props;
        console.log('auth:',auth,'admin query reputaion:',adminQueryReputation);

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
                            <td> </td>
                            <td> </td>
                            <td> </td>
                            <td> </td>
                            <td> </td>
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