import React from 'react';
import {Link,browserHistory} from 'react-router';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {customTime} from '../../utiles';
import Alert from 'react-s-alert';
import $ from 'jquery';

import * as Actions from '../../actions';
import {API_ROOT} from '../../config';

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
        this.deleteArticle = this.deleteArticle.bind(this);
        this.addArticle = this.addArticle.bind(this);
        this.updateArticle = this.updateArticle.bind(this);
        this.getArticle = this.getArticle.bind(this);
    }

    componentDidMount(){
       // const {actions,auth} = this.props;
       // actions.getArticleList();
       // actions.getArticleDetail();
    }

    getArticle(t_id){
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

    addArticle(e){
        e.preventDefault();
        browserHistory.push('/write');
    }

    updateArticle(t_id){
    }

    deleteArticle(t_id){
      //  const {actions} = this.props;
      //  actions.deleteArticle(u_id,u_psw,t_id);
        let url = API_ROOT + 't/del';
        $.post(url,{u_id:sessionStorage.getItem('u_id'),u_psw:sessionStorage.getItem('u_psw'),t_id:t_id},
            function (data) {
                if(data.code === 1){
                    let content = '删除成功';
                    let type = 'success';
                    const {hideMsg} = this.props;
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
                        hideMsg();
                    }
                }
                else {
                    let content = data.codeState;
                    let type = 'error';
                    const {hideMsg} = this.props;
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
                        hideMsg();
                    }
                }
            }
        )
    }

    render(){
        // const {auth,articleDetail} = this.props;
       // console.log('auth:',auth,'articleList:',articleDetail);
        let userArticles = sessionStorage.getItem('u_articles').split(',');
        console.log('userArticleIds:',userArticles);

        return (
            <div className="style_16">
                <Alert stack={{limit:1}} position='top-right' timeout={3000}/>
                <br />
                <br />
                <div className="panel admin-panel">
                    <div className="panel-head">
                        <strong className="icon-reorder"> 文章列表</strong>
                        <Link to='/personalpage'>返回用户页面</Link>
                    </div>
                    <br />
                    <div className="padding border-bottom">
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <button type="button" className="button border-yellow"
                                onClick={(e) => this.addArticle(e)}>
                            <span className="icon-plus-square-o"> </span> 添加文章</button>
                    </div>
                    <br />
                    <table className="table table-hover text-center">
                        <tr>
                            <th width="5%">&nbsp;&nbsp; 序号</th>
                            <th width="10%">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;标题</th>
                            <th width="15%">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;概述</th>
                            <th width="10%">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;时间</th>
                            <th width="30%">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;操作</th>
                        </tr>
                            {
                                userArticles.map((userArticlesId,i) => {
                                    this.getArticleAbout(userArticlesId);
                                    return(
                                        <tr key={i}>
                                            <td>{i}</td>
                                            <td><Link to={'/article/' + localStorage.getItem('t_id')}>{localStorage.getItem('t_title')}</Link></td>
                                            <td><Link to={'/article/' + localStorage.getItem('t_id')}>{localStorage.getItem('t_text')}</Link></td>
                                            <td>{customTime(localStorage.getItem('t_date_latest'))}</td>
                                            <td>
                                                <div className="button-group">
                                                    <a className="button border-main" href="" onClick={(e) => this.updateArticle(userArticlesId)}>
                                                        <span className="icon-edit"> </span>
                                                        修改
                                                    </a>
                                                    <a className="button border-red" href="" onClick={(e) => this.deleteArticle(userArticlesId)}>
                                                        <span className="icon-trash-o"> </span>
                                                        删除
                                                    </a>
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                    </table>
                </div>
                <br /><br /><br /><br /><br /><br /><br /><br />
            </div>
        )
    }
}