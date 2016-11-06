import React from 'react'

export default class Content extends React.Component{
    render(){
        const {articleDetail} = this.props;

        return (
            <div className="article-container">
                <h1 className="title">{articleDetail.t_title}</h1>
                <div className="counts">
                    <span className="views-count">
                        阅读{articleDetail.t_star}
                    </span>
                    <span className="comments-count">
                        评论{articleDetail.t_comments}
                    </span>
                    <span className="likes-count">
                        喜欢{articleDetail.t_like}
                    </span>
                </div>
                <div className="markdown-content"
                     dangerouslySetInnerHTML={{__html:articleDetail.content}}>
                </div>
            </div>
        )

    }
}