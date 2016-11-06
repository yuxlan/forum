import React from 'react'

export default class Like extends React.Component{
    render(){
        const {likeCount,isLike,toggleLike} = this.props;
        return (
            <div className="article-like">
                <a href="javascript:;" className={isLike?'liked-btn be-liked':'liked-btn'} onClick={toggleLike}>
                    <i className="fa fa-thumbs-up"> </i>
                </a>
            </div>
        )
    }
}