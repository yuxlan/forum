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
            key:'',
            articleIds:'',
            articleDetail:[],
            articleAnswer:[],
            questionAnswer:[],
        }
    }

    componentDidMount(){
        // 获取密钥
        let Surl = API_ROOT + 'safe/secret_key';
        $.get(Surl,
            function (data) {
                this.setState({key:data});
                console.log('key:',this.state.key);
            }.bind(this));

        let userArticlesIds = sessionStorage.getItem('u_questions').split('&');
        let userArticles = userArticlesIds.toString().split(',');
        let articleDetailUrl = API_ROOT + 'q/query';
        let articleDetail = new Array();
        let articleAnswer = new Array();
        for(let i=0; i<(userArticles.length-1); i++){
            $.get(
                articleDetailUrl,
                {q_id:userArticles[i]},
                function (data) {
                    this.setState({articleIds:sessionStorage.getItem('u_questions')});
                    console.log('get all article details by their ids:',data);
                    articleDetail[i] = data;
                    articleAnswer[i] = data.q_answers.split(',');
                    console.log('get all article details and put them into the array:',articleDetail);
                    this.setState({articleDetail:articleDetail});
                    this.setState({articleAnswer:articleAnswer});
                    console.log('articleDetails:',this.state.articleDetail);
                    return this.getQuestionAnswer()
                }.bind(this)
            )
        }
    }

    // 问题的回答
    getQuestionAnswer(){
        let url = API_ROOT + 'a/query';
        let questionAnswer = new Array();
        for (let i=0;i<this.state.articleAnswer.length;i++){
            $.get(url,{a_id:this.state.articleAnswer[i]},
                function (data) {
                    console.log('get all question ids:',data);
                    questionAnswer[i] = data;
                    this.setState({questionAnswer:questionAnswer});
                }.bind(this))
        }
    }

    addArticle(e){
        e.preventDefault();
        browserHistory.push('/write');
    }

    updateArticle(t_id){
    }

    deleteArticle(q_id){
        let url = API_ROOT + 'q/del';
        let userUrl = API_ROOT + 'u/query';
        let user_id = sessionStorage.getItem('u_id');
        $.post(url,{u_id:user_id,u_psw:sessionStorage.getItem('u_psw'),q_id:q_id,secret_key:this.state.key},
            function (data) {
                console.log('delete article:',data);
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
                    $.get(userUrl, {u_id: user_id},
                        function (data) {
                            console.log('getUserInfo:', data);
                            if (data.code == 1) {
                                sessionStorage.removeItem('u_questions');
                                sessionStorage.setItem('u_questions', data.u_questions);
                                this.setState({articleIds:sessionStorage.getItem('u_questions')});
                                let userArticlesIds = sessionStorage.getItem('u_questions').split('&');
                                let userArticles = userArticlesIds.toString().split(',');
                                let articleDetailUrl = API_ROOT + 'q/query';
                                let articleDetail = new Array();
                                for(let i=0; i<(userArticles.length-1); i++){
                                    $.get(
                                        articleDetailUrl,
                                        {t_id:userArticles[i]},
                                        function (data) {
                                            console.log('get all article details by their ids:',data);
                                            articleDetail[i] = data;
                                            console.log('get all article details and put them into the array:',articleDetail);
                                            this.setState({articleDetail:articleDetail});
                                            console.log('articleDetails:',this.state.articleDetail);
                                        }
                                    )
                                }
                            }
                        }
                    )
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
                        <strong className="icon-reorder"> 问答列表</strong>
                    </div>
                    <table className="table table-hover text-center">
                        <tr className="text-center">
                            <th width="5%" className="text-center">&nbsp;序号</th>
                            <th width="9%" className="text-center">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;标题</th>
                            <th width="13%" className="text-center">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;提出时间</th>
                            <th width="13%" className="text-center">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;已有回答数</th>
                            <th width="30%" className="text-center">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;操作</th>
                        </tr>
                        {
                            this.state.articleIds !== '&' &&
                            this.state.articleDetail.map((article, i) => {
                                return(
                                    <tr key={i}>
                                        <td>{i + 1}</td>
                                        <td><Link to={'/article/' + article.q_id}>{article.q_title}</Link></td>
                                        <td>{formatDate(article.q_date)}</td>
                                        <td>{this.state.questionAnswer.length}</td>
                                        <td>
                                            <div className="button-group">
                                                <button className="button border-main" onClick={(e) => this.updateArticle(userArticlesId)}>
                                                    <span className="icon-edit"> </span>
                                                    修改
                                                </button>
                                                <button className="button border-red" onClick={(e)=>this.deleteArticle(article.t_id)}>
                                                    <span className="icon-trash-o"> </span>
                                                    删除
                                                </button>
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