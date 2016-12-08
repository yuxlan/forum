// 喜欢一篇文章，即类似于点赞

import React from 'react'

export default class Like extends React.Component{
    render(){
        const {likeCount,isLike} = this.props;

        return (
            <div className="article-like">
                <a href="#" className={isLike?'liked-btn be-liked':'liked-btn'}>
                    <i className="fa fa-thumbs-up"> </i>
                </a>
            </div>
        )
    }
}