// 显示所有的标签

import React from 'react'
import {Link} from 'react-router';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {API_ROOT} from '../../config';
import $ from 'jquery';
import * as Actions from '../../actions';
function mapStateToProps(state){
    return {
        tagList:state.tagList.toJS(),
        articleList:state.articleList.toJS(),
        articleDetail:state.articleDetail.toJS(),
    }
}

function mapDispatchToProps(dispatch){
    return {
        actions:bindActionCreators(Actions,dispatch)
    }
}

@connect(mapStateToProps,mapDispatchToProps)
export default class Tags extends React.Component{

    constructor(){
        super();
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(changeSort,options){
        return function(e){
            changeSort(e,options);
        }
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
        return(
            <div className="body-main">
                <div className="con-left">
                    <ul className="con-left-ul">
                        <li className="con-left-li">
                            <a href="">所有标签</a>
                            <div className="lesson-list-detail">
                                <div className="lesson-list-con">
                                    <dl>
                                        <dt><a href=""
                                               onClick={e => this.handleClick()}>
                                            所有标签
                                        </a></dt>
                                        {
                                            tagList.map((tag,i) => {
                                                return (
                                                    <dd key={i}>
                                                        <a href=""
                                                           onClick={e => this.handleClick({tag})}>
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
                            <a href="#">ios</a>
                        </li>
                        <li className="con-left-li">
                            <a href="#">android</a>
                        </li>
                        <li className="con-left-li">
                            <a href="#">linux</a>
                        </li>
                        <li className="con-left-li">
                            <a href="#">windows</a>
                        </li>
                        <li className="con-left-li">
                            <a href="#">后端开发</a>
                        </li>
                        <li className="con-left-li">
                            <a href="#">前端开发</a>
                        </li>
                        <li className="con-left-li">
                            <a href="#">数据库</a>
                        </li>
                        <li className="con-left-li">
                            <a href="#">云计算</a>
                        </li>
                        <li className="con-left-li">
                            <a href="#">服务器</a>
                        </li>
                    </ul>
                </div>
                <div className="main-content main-MC main-c_T">
                    <div className="content-topBar content-t_NL_ATL main-c_T">
                        <dl className="topBar-nav topBar-NL content-t_NL_ATL">
                            <dt className="topBar--pointer content-t_NL_ATL">全部文章</dt>
                            <dd className="topBar--pointer content-t_NL_ATL">
                                <span><Link to='/homearticle'>最新</Link></span>&nbsp;
                                <span>|</span>
                                &nbsp;<span><Link to='/homearticlehot'>最热</Link></span>
                            </dd>
                        </dl>
                        <div className="topBar-lookWay topBar-NL content-t_NL_ATL">
                            <i className="topBar--pointer lookWay-tile lookWay-TL content-t_NL_ATL"> </i>
                            <i className="topBar--pointer lookWay-list lookWay-TL content-t_NL_ATL"> </i>
                        </div>
                    </div>
                </div>

                {articlesByHot.length > 0 &&
                articlesByHot.map((t_id, i) => {
                    this.getArticleAbout(t_id);
                    return(
                        <div className="content-shelf"
                             key={i}>
                            <div className="shelf-exhibit">
                                <div className="exhibit-photoFrame">
                                </div>
                                <div className="exhibit-describe">
                                    <h4>
                                        <Link to={'/article/' + localStorage.getItem('t_id')}
                                              className="link-title">
                                            {localStorage.getItem('t_title')}
                                        </Link>
                                    </h4>
                                    <p> </p>
                                    <div className="exhibit-tags">
                                        <span className="tag-time"><i> </i></span>
                                        <span className="tag-level"><i> </i></span>
                                        <span className="tag-numberOf"> </span>
                                        <i className="exhibit-type"> </i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })
                }

            </div>
        )
    }
}