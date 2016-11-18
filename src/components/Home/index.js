// 首页，获取全部文章

import React,{Component} from 'react'
import {Link} from 'react-router';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import * as Actions from '../../actions';
import {customTime} from '../../utiles';

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
        const {actions} = this.props;
        actions.getArticleDetail(t_id);
    }

    render(){
        const {tagList,articleList,articleDetail,options,actions,auth,location,showmsg,children} = this.props;
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
                                                return(
                                                    <li className="article-item"
                                                        key={i}
                                                        onLoad={e => this.getArticleAbout(t_id)}>
                                                        <div className="articleList-item">
                                                            <p className="list-top">
                                                                <span className="time">
                                                                    {customTime(articleDetail.articleDateLatest)}
                                                                </span>
                                                            </p>
                                                            <h4 className="title">
                                                                <Link to={'/article/' + articleDetail.articleId}
                                                                      className="link-title">
                                                                    <strong>
                                                                        {articleDetail.articleTitle}
                                                                    </strong>
                                                                </Link>
                                                            </h4>
                                                            <p className="list-footer">
                                                                <span className="visit-count">
                                                                    收藏 {articleDetail.articleStar}
                                                                </span>
                                                                <span className="comment-count">
                                                                    评论 {articleDetail.articleComments}
                                                                </span>
                                                                <span className="like-count">
                                                                    喜欢 {articleDetail.articleLike}
                                                                </span>
                                                                <span>  标签{articleDetail.articleTags}&nbsp;
                                                                </span><br/>
                                                                <Link to=""/>
                                                            </p>
                                                        </div><br/><br/>
                                                    </li>
                                                )}
                                        )}
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