import React from 'react';
import {Link,browserHistory} from 'react-router';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {customTime,formatDate} from '../../utiles';
import Alert from 'react-s-alert';
import $ from 'jquery';
import markIt from'../WriteArticle/marked';

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
        this.state={
            articleIds:'',
            articleDetail:[],
        }
    }

    componentDidMount(){
        let userArticles = sessionStorage.getItem('u_articles').split(',');
        let articleDetailUrl = API_ROOT + 't/query';
        let articleDetail = new Array();
        for(let i=0; i<userArticles.length; i++){
            $.get(
                articleDetailUrl,
                {t_id:userArticles[i]},
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
                if(data.code == 1){
                    let content = '删除成功';
                    let type = 'success';
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
                }
                else {
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
            }
        )
    }

    render(){

        return (
            <div className="style_16">
                <Alert stack={{limit:1}} position='top-right' timeout={3000}/>
                <br />
                <br />
                <div className="panel admin-panel">
                    <div className="panel-head">
                        <strong className="icon-reorder"> 文章列表</strong>
                    </div>
                    <br />
                    <div className="padding border-bottom">
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <button type="button" className="button border-yellow"
                                onClick={(e) => this.addArticle(e)}>
                            <span className="icon-plus-square-o"> </span> 添加文章</button><br/>
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
                                this.state.articleDetail!==[] &&
                                this.state.articleDetail.map((article, i) => {
                                    return(
                                        <tr key={i}>
                                            <td>{i + 1}</td>
                                            <td><Link to={'/article/' + article.t_id}>{article.t_title}</Link></td>
                                            <td><Link to={'/article/' + article.t_id}><div dangerouslySetInnerHTML={{__html: markIt(article.t_text)}}></div></Link></td>
                                            <td>{formatDate(article.t_date_latest)}</td>
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