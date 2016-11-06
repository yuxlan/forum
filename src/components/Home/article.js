import React from 'react'
import {Link} from 'react-router'
import {customTime} from '../../utiles'

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

        return (
            <ul className="article-list list-unstyled clearfix">
                {articleList.length > 0&&
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

                }
            </ul>
            
        )
    }
}