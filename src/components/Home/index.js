// 首页，获取全部文章

import React,{Component} from 'react'
import {Link} from 'react-router';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import $ from 'jquery';

import * as Actions from '../../actions';
import {customTime} from '../../utiles';
import {API_ROOT} from '../../config';

import Tags from './tags';
import Nav from './navbar';
import Footer from './footer';
import ScrollTop from '../ScrollTop';

function mapStateToProps(state){
    return {
        tagList:state.tagList.toJS(),
        articleList:state.articleList.toJS(),
        articleDetail:state.articleDetail.toJS(),
        options:state.options.toJS(),
        auth:state.auth.toJS()
    }
}

function mapDispatchToProps(dispatch){
    return {
        actions:bindActionCreators(Actions,dispatch)
    }
}

@connect(mapStateToProps,mapDispatchToProps)
export default class Home extends Component{
    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.getArticleAbout = this.getArticleAbout.bind(this);
    }

    componentDidMount(){
        console.log('didmount');

        const{actions,tagList,articleList} = this.props;

        if(tagList.length < 1){
            actions.getTagList()
        }

        actions.getArticleList();
    }

    handleChange(e,option,isAdd=false){
        e.preventDefault();
        const {actions} = this.props;
        actions.changeOptions(option);
    }

    getArticleAbout(t_id){
       // const {actions} = this.props;
       // actions.getArticleDetail(t_id);
        let url = API_ROOT + 't/query';
        $.get(url,{t_id:t_id},
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

    render(){
        const {tagList,articleList,options,actions,auth,location,showmsg,children,articleDetail} = this.props;
        console.log('tagList:',tagList,'articleList:',articleList,'articleDetail:',articleDetail);

        let articleIds = articleList.tIds.split('&');

        let articleIdsByHot = articleIds[0];
        let articlesByHot = articleIdsByHot.toString().split(',');
        console.log('articleByHot:',articlesByHot);

        let articleIdsByTime = articleIds[1];
        console.log('articleIdsByTime:',articleIdsByTime);
        //let articlesByTime = articleIdsByTime.toString().split(',');
       // console.log('articleByTime:',articlesByTime);
        return (
            <div className="home-container">
                <Nav changeStyleMode={actions.changeStyleMode}
                     location={location}
                     auth={auth}
                     logout={actions.logout}/>
                <br/><br/><br/><br/>
                <div className="background">
                </div>
                <div className="outer-container">
                    <div className="wrap-container">
                        <div className="content-outer">
                            <div className="content-inner">
                                <Tags tagList={tagList}/>
                                <br /><br />
                                <div className="live-lesson">
                                    <ul className="article-list list-unstyled clearfix">
                                        {articlesByHot.length > 0 &&
                                        articlesByHot.map((t_id,i) =>{
                                                this.getArticleAbout(t_id);
                                                return(
                                                    <li className="article-item"
                                                        key={i}>
                                                        <div className="articleList-item">
                                                            <p className="list-top">
                                                                <span className="time">
                                                                    {customTime(localStorage.getItem('t_date_latest'))}
                                                                </span>
                                                            </p>
                                                            <h2 className="title">
                                                                <strong>
                                                                <Link to={'/article/' + localStorage.getItem('t_id')}
                                                                      className="link-title">
                                                                        {localStorage.getItem('t_title')}
                                                                </Link>
                                                                </strong>
                                                            </h2>
                                                            <p className="list-footer">
                                                                <span className="visit-count">
                                                                    收藏 {localStorage.getItem('t_star')}
                                                                </span>
                                                                <span className="comment-count">
                                                                    评论 {localStorage.getItem('t_comments')}
                                                                </span>
                                                                <span className="like-count">
                                                                    喜欢 {localStorage.getItem('t_like')}
                                                                </span>
                                                                <span>  标签{localStorage.getItem('t_tags')}&nbsp;
                                                                </span><br/>
                                                                <Link to=""/>
                                                            </p>
                                                        </div><br/><br/>
                                                    </li>
                                                )
                                        })
                                        }
                                    </ul>
                                    <br /><br />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <ScrollTop/>
                <Footer />
            </div>

        )
    }
}