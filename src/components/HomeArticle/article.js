import React from 'react'
import {Link} from 'react-router'
import {customTime} from '../../utiles'


/*{articleList.length > 0&&
 articleList.map((article,i) =>
 <li key={i} className="article-item">
 <div className="articleList-item">
 <p className="list-top">
 <span className="time">{customTime(article.t_date_latest)}</span>
 </p>
 <h4 className="title">
 <Link to={'/article/'+ article.t_id} className="link-title">{article.t_title}</Link>
 </h4>
 <p className="list-footer">

 <span className="visit-count">  阅读 {article.t_star}</span>
 <span className="comment-count">  评论 {article.t_comments}</span>
 <span className="like-count">  喜欢 {article.t_like}</span>
 <span>  标签&nbsp;
 {article.tags.map((tag,index) => {
 return (
 <span>
 <a href="#"
 onClick={this.handleClick(changeSort,{'currentPage':1,'sortName':'','tagId':''})}>
 {tag[index]}
 </a> /
 </span>

 )
 })}
 </span><br/>
 <Link to=""/>
 </p>
 </div>
 </li>
 )

 }*/
/*

 {articletags.map((tag,i) => {
 return (
 <span>
 <a href="#"
 onClick={this.handleClick(changeSort,{'currentPage':1,'sortName':'','tagId':''})}>
 {tag[i]}
 </a> /
 </span>
 )
 })}
 */

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
        const {articleid,articletitle, articledate,articlelike,
            articlecomments,articletags,articledatelatest,articlestar,articleList,changeSort} = this.props;
        console.log(articleid,articletitle, articledate,articlelike,
            articlecomments,articletags,articledatelatest,articlestar,articleList);
        return (
            <div className="live-lesson">
                <ul className="article-list list-unstyled clearfix">
                    <li className="article-item">
                        <div className="articleList-item">
                            <p className="list-top">
                                <span className="time">
                                    {customTime(articledatelatest)}
                                </span>
                            </p>
                            <h4 className="title">
                                <Link to={'/article/'+ articleid}
                                    className="link-title">
                                    {articletitle}
                                </Link>
                            </h4>
                            <p className="list-footer">
                                <span className="visit-count">
                                    收藏 {articlestar}
                                </span>
                                <span className="comment-count">
                                    评论 {articlecomments}
                                </span>
                                <span className="like-count">
                                    喜欢 {articlelike}
                                </span>
                                <span>  标签&nbsp;
                                </span><br/>
                                <Link to=""/>
                            </p>
                        </div>
                    </li>
                </ul>
            </div>
        )
    }
}