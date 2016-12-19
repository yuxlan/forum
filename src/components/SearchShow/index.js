import React,{Component} from 'react'
import Nav from '../Home/navbar'
import Footer from '../Home/footer'
import ScrollTop from '../ScrollTop'
import {Link,browserHistory} from 'react-router';
import $ from 'jquery';
import {API_ROOT} from '../../config';
import Loading from '../../assets/imgs/tiny.gif';
import {formatDate} from '../../utiles';

export default class SearchShow extends Component{
    constructor(props){
        super(props);
        this.state={
            userIds:'',
            articleIds:'',
            questionIds:'',
            answerIds:'',
            userDetails:[],
            articleDetails:[],
            questionDetails:[],
            answerDetails:[],
        };
        this.setSearchIds = this.setSearchIds.bind(this);
    }

    componentDidMount(){
    }

    setSearchIds(data){
        this.setState({userIds:data.u_ids,articleIds:t_ids,questionIds:q_ids,answerIds:a_ids});
        console.log('searchIds:',this.state.userIds);
        console.log('articleIds:',this.state.articleIds);
        console.log('questionIds:',this.state.questionIds);
        console.log('answerIds:',this.state.answerIds);

        let userId = this.state.userIds.split(',');
        let articleId = this.state.articleIds.split(',');
        let questionId = this.state.questionIds.split(',');
        let answerId = this.state.answerIds.split(',');

        let userDetails = new Array();
        let articleDetails = new Array();
        let questionDetails = new Array();
        let answerDetails = new Array();

        for (let i=0; i<userId.length; i++){
            let userUrl = API_ROOT + 'u/query';
            $.get(
                userUrl,
                {u_id:userId[i]},
                function (data) {
                    console.log('user details:',data);
                    userDetails[i]=data;
                    this.setState({userDetails:userDetails});
                }.bind(this)
            )
        };

        for (let j=0; j<articleId.length; j++){
            let articleUrl = API_ROOT + 't/query';
            $.get(
                articleUrl,
                {t_id:articleId[i]},
                function (data) {
                    console.log('article Details:',data);
                    articleDetails[i]=data;
                    this.setState({articleDetails:articleDetails});
                }.bind(this)
            )
        };

        for (let k=0; k<questionId.length; k++){
            let questionUrl = API_ROOT + 'q/query';
            $.get(
                questionUrl,
                {q_id:questionId[i]},
                function (data) {
                    console.log('question Details:',data);
                    questionDetails[i]=data;
                    this.setState({questionDetails:questionDetails});
                }.bind(this)
            )
        };

        for (let l=0; l<answerId.length; l++){
            let answerUrl = API_ROOT + 'a/query';
            $.get(
                answerUrl,
                {a_id:answerId[i]},
                function (data) {
                    console.log('answer Details:',data);
                    answerDetails[i]=data;
                    this.setState({answerDetails:answerDetails});
                }.bind(this)
            )
        };
    }

    render(){

        return (
            <div className="home-container">
                <Nav setSearchIds={this.setSearchIds}/><br/><br/><br/><br/><br/><br/>
                <div className="background">
                </div>
                <div className="outer-container"><div className="wrap-container"><div className="content-outer"><div className="content-inner"><div className="body-main">
                    <div className="main-content main-MC main-c_T">
                        <div className="content-topBar content-t_NL_ATL main-c_T">
                            <dl className="topBar-nav topBar-NL content-t_NL_ATL">
                                <dt className="topBar--pointer content-t_NL_ATL">
                                    <a href="">全部</a>
                                </dt>
                                <dt className="topBar--pointer content-t_NL_ATL">
                                    <a href="">用户</a>
                                </dt>
                                <dt className="topBar--pointer content-t_NL_ATL">
                                    <a href="">文章</a>
                                </dt>
                                <dt className="topBar--pointer content-t_NL_ATL">
                                    <a href="">问题</a>
                                </dt>
                                <dt className="topBar--pointer content-t_NL_ATL">
                                    <a href="">回答</a>
                                </dt>
                            </dl>
                        </div>
                    </div><br/>
                    <div className="content-shelf-container">
                        {
                            this.state.userIds == '' && this.state.articleIds == '' && this.state.questionIds == '' && this.state.answerIds == '' ?
                                <div className="content-shelf-1"><br/><br/><br/><br/><br/>
                                    <p className="link-title text-center">
                                        抱歉╮(╯▽╰)╭，暂时没有相关内容，请输入搜索其它内容……
                                    </p>
                                </div>
                                    :
                                <div>
                                    {
                                        this.state.userDetails((user,i) =>{
                                            return(
                                                <div key={i}>
                                                    <div className="content-shelf-1">
                                                        <a className="link-title">
                                                            用户名&nbsp;&nbsp;{user.u_name}
                                                        </a>
                                                        <p>
                                                            {user.u_intro}
                                                        </p>
                                                        <br/>
                                                        <span className="span1">声望值&nbsp;{user.u_reputation}</span>&nbsp;&nbsp;
                                                        <br/><br/>
                                                    </div>
                                                    <br/>
                                                </div>
                                            )
                                        })
                                    }
                                    {
                                        this.state.articleDetails((article,i) =>{
                                            return(
                                                <div>
                                                    <div className="content-shelf-1">
                                                        <a className="link-title">
                                                            {article.t_title}
                                                        </a>
                                                        <br/>
                                                        <span className="span1">收藏{article.t_star}</span>&nbsp;&nbsp;
                                                        <span className="span3">喜欢{article.t_like}</span>&nbsp;&nbsp;
                                                        <span
                                                            className="span2">标签{article.t_tags}</span>&nbsp;&nbsp;&nbsp;&nbsp;
                                                        <span>
                                                            时间{formatDate(article.t_date_latest)}
                                                        </span>
                                                        <br/><br/>
                                                    </div>
                                                    <br/>
                                                </div>
                                            )
                                        })
                                    }
                                    {
                                        this.state.questionDetails((question,i) =>{
                                            return(
                                                <div>
                                                    <div className="content-shelf-1">
                                                        <a className="link-title">
                                                            {question.q_title}
                                                        </a>
                                                        <br/>
                                                        <span className="span1">收藏{question.q_star}</span>&nbsp;&nbsp;
                                                        <span className="span3">喜欢{question.q_like}</span>&nbsp;&nbsp;
                                                        <span
                                                            className="span2">标签{question.q_tags}</span>&nbsp;&nbsp;&nbsp;&nbsp;
                                                        <span>
                                                            时间{formatDate(question.q_date_latest)}
                                                        </span>
                                                        <br/><br/>
                                                    </div>
                                                    <br/>
                                                </div>
                                            )
                                        })
                                    }
                                    {
                                        this.state.answerDetails((answer,i) =>{
                                            return(
                                                <div>
                                                    <div className="content-shelf-1">
                                                        <a className="link-title">
                                                            {answer.a_text}
                                                        </a>
                                                        <br/>
                                                        <span className="span1">收藏{answer.a_star}</span>&nbsp;&nbsp;
                                                        <span className="span3">喜欢{answer.a_like}</span>&nbsp;&nbsp;
                                                        <span>
                                                            回答时间{formatDate(answer.a_date_latest)}
                                                        </span>
                                                        <br/><br/>
                                                    </div>
                                                    <br/>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                        }
                    </div>
                </div>
                    <br /><br /></div><br /><br /></div><br /><br /></div><br /><br /></div><br /><br /><ScrollTop/><Footer />
            </div>
        )
    }
}