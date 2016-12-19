// 显示问题的列表，按照问题的热度进行排序

import React,{Component} from 'react';
import {Link,browserHistory} from 'react-router';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import $ from 'jquery';

import {API_ROOT} from '../../config';
import * as Actions from '../../actions';

import Nav from './navbar';
import Footer from './footer';
import ScrollTop from '../ScrollTop';

const mapStateToProps = (state) => {
    return {
        tagList:state.tagList.toJS(),
        articleList:state.articleList.toJS(),
        options:state.options.toJS(),
        auth:state.auth.toJS()
    }
};

const mapDispatchToProps = dispatch => {
    return {
        actions:bindActionCreators(Actions,dispatch)
    }
};

@connect(mapStateToProps,mapDispatchToProps)
export default class Home extends Component{
    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state={
            tagList:[],
            articleIds:'',
            articleDetail:[],
            articleAnswer:[],
            questionAnswer:[],
        }
    }

    componentDidMount(){
        console.log('get the question first,by the hot');

        // 取到所有的tags
        let tagUrl = API_ROOT + 'public/tags';
        $.get(
            tagUrl,
            function (data) {
                //console.log('is already get all tags:',data);
                this.setState({tagList:data});
                //console.log('is already get all tags and set its tate:',this.state.tagList);
            }.bind(this)
        );

        this.handleClick()
    }

    // 取到所有问题的id
    handleClick(event,t_tags){
        let articleIdUrl = API_ROOT + 'q/display';
        $.get(
            articleIdUrl,
            {q_tags:t_tags},
            function (data) {
                //console.log('get all article ids by all tags:',data);
                this.setState({articleIds:data.q_ids});
                //console.log('articleIds:',this.state.articleIds);
                let articleIds = this.state.articleIds.split('&');
                let articleIdsByHot = articleIds[0];
                let articlesByHot = articleIdsByHot.toString().split(',');
                //console.log('articlesByHot:',articlesByHot);
                return this.getArticleDetails(articlesByHot)
            }.bind(this)
        );
    }

    // 取问题的详情
    getArticleDetails(articlesByHot){
        let articleDetailUrl = API_ROOT + 'q/query';
        let articleDetail = new Array();
        let articleAnswer = new Array();
        for(let i=0; i<articlesByHot.length; i++){
            $.get(
                articleDetailUrl,
                {q_id:articlesByHot[i]},
                function (data) {
                    //console.log('get all article details by their ids:',data);
                    articleDetail[i] = data;
                    articleAnswer[i] = data.q_answers.split(',');
                    //console.log('get all article details and put them into the array:',articleDetail);
                    this.setState({articleDetail:articleDetail});
                    this.setState({articleAnswer:articleAnswer});
                    //console.log('articleDetails:',this.state.articleDetail);
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
                    //console.log('get all question ids:',data);
                    questionAnswer[i] = data;
                    this.setState({questionAnswer:questionAnswer});
                }.bind(this))
        }
    }

    // 改变选择的标签，按照标签获取问题
    handleChange(e,option,isAdd=false){
        e.preventDefault();
        const {actions} = this.props;
        actions.changeOptions(option);
        actions.getArticleList(isAdd)
    }

    render(){
        return (
            <div className="home-container">
                <Nav/>
                <div className="background">
                </div>
                <div className="outer-container"><div className="wrap-container"><div className="content-outer"><div className="content-inner"><div className="body-main"><div className="con-left">
                    <ul className="con-left-ul">
                        <li className="con-left-li">
                            <a href="">所有标签</a>
                            <div className="lesson-list-detail">
                                <div className="lesson-list-con">
                                    <dl>
                                        <dt><a href="" onClick={(event)=>this.handleClick(event)}>所有标签</a></dt>
                                        {
                                            this.state.tagList.map((tag,i) => {
                                                return (
                                                    <dd key={i}>
                                                        <a onClick={(event)=>this.handleClick(event,tag.toString())}>
                                                            {tag}
                                                        </a>
                                                    </dd>
                                                )
                                            })
                                        }
                                    </dl>
                                </div>
                            </div>
                        </li>
                        <li className="con-left-li">
                            <a onClick={(event)=>this.handleClick(event,'ios')}>ios</a>
                        </li>
                        <li className="con-left-li">
                            <a onClick={(event)=>this.handleClick(event,'android')}>android</a>
                        </li>
                        <li className="con-left-li">
                            <a onClick={(event)=>this.handleClick(event,'linux')}>linux</a>
                        </li>
                        <li className="con-left-li">
                            <a onClick={(event)=>this.handleClick(event,'windows')}>windows</a>
                        </li>
                        <li className="con-left-li">
                            <a onClick={(event)=>this.handleClick(event,'后端开发')}>后端开发</a>
                        </li>
                        <li className="con-left-li">
                            <a onClick={(event)=>this.handleClick(event,'前端开发')}>前端开发</a>
                        </li>
                        <li className="con-left-li">
                            <a onClick={(event)=>this.handleClick(event,'数据库')}>数据库</a>
                        </li>
                        <li className="con-left-li">
                            <a onClick={(event)=>this.handleClick(event,'云计算')}>云计算</a>
                        </li>
                        <li className="con-left-li">
                            <a onClick={(event)=>this.handleClick(event,'服务器')}>服务器</a>
                        </li>
                    </ul>
                </div>
                    <div className="main-content main-MC main-c_T">
                        <div className="content-topBar content-t_NL_ATL main-c_T">
                            <dl className="topBar-nav topBar-NL content-t_NL_ATL">
                                <dt className="topBar--pointer content-t_NL_ATL">全部问题</dt>
                                <dt className="topBar--pointer content-t_NL_ATL">
                                    <Link to='/homequestion'>最新</Link>
                                </dt>
                                <dt>
                                    <Link to='/homequestionhot'>最热</Link>
                                </dt>
                            </dl>
                        </div>
                    </div>

                    {
                        this.state.articleIds === '&'
                            ?
                            <div className="text-center home-container">
                                <br/><br/><br/><br/><br/><br/><br/><br/>
                            </div>
                            :
                            <div className="content-shelf-container">
                                {   this.state.articleIds !== '' &&
                                this.state.articleDetail.map((question, i) => {
                                    return (
                                        <div>
                                            <div className="content-shelf"
                                                 key={i}>
                                                <a>
                                                    <strong>
                                                        <Link to={'/question/' + question.q_id}
                                                              className="link-title">
                                                            {question.q_title}
                                                        </Link>
                                                    </strong>
                                                </a>
                                                <p> </p><br/>
                                                <span className="span1">收藏 {question.q_star}</span>&nbsp;&nbsp;
                                                <span className="span2">喜欢 {question.q_like}</span>&nbsp;&nbsp;
                                                <span className="span4">已有回答 {this.state.questionAnswer.length}</span>&nbsp;&nbsp;
                                                <br/><br/>
                                            </div>
                                            <br/>
                                        </div>
                                    )
                                })}
                            </div>
                    }
                </div>
                    <br /><br /></div><br /><br /></div><br /><br /></div><br /><br /></div><br /><br /><ScrollTop/><Footer />
            </div>
        )
    }
}