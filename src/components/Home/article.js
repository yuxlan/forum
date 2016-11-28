import React from 'react';
import {Link} from 'react-router';
import * as actions from '../../actions';
import {customTime} from '../../utiles';

export default class Articles extends React.Component{
    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick(changeSort,options){
        return function(e){
            changeSort(e,options);
        }
    }

    render(){
        const {articleList,changeSort} = this.props;
        console.log('article_ids:',articleList);
       // let articleIds=articleList.split(',');
       // console.log('articleIds:',articleIds);
        let articleIds = articleList.tIds.split(',');
        return (
            <div className="live-lesson">
                <ul className="article-list list-unstyled clearfix">
                    {articleIds.length > 0 &&
                    articleIds.map((t_id,i) =>{
                            actions.getArticleDetail(t_id);
                            const {articleDetail} = this.props;
                            console.log('articleDetails:',articleDetail);
                        return(
                            <li className="article-item"
                                key={i}>
                                <div className="articleList-item">
                                    <p className="list-top">
                                        <span className="time">
                                            {customTime(articleDetail.t_date_latest)}
                                        </span>
                                    </p>
                                    <h4 className="title">
                                        <Link to={'/article/' + articleDetail.t_id}
                                              className="link-title">
                                            <strong>
                                            {articleDetail.t_title}
                                            </strong>
                                        </Link>
                                    </h4>
                                    <p className="list-footer">
                                        <span className="visit-count">
                                            收藏 {articleDetail.t_star}
                                        </span>
                                        <span className="comment-count">
                                            评论 {articleDetail.t_comments}
                                        </span>
                                        <span className="like-count">
                                            喜欢 {articleDetail.t_like}
                                        </span>
                                        <span>  标签{articleDetail.t_tags}&nbsp;
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
        )
    }
}