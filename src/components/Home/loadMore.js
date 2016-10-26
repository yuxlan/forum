// 固定组件，加载更多

import React from 'react'

export default class LoadMore extends React.Component{
    render(){
        const {addData,options,isMore,isFetching} = this.props;
        return (
            <div className="load-more">
                {isMore&&
                <button className="ladda-button"
                        onClick={e => addData(e,{'currentPage':++options.currentPage},true)}>
                    {isFetching?
                        <span className="ladda-spinner">
                            <i className="fa fa-spinner fa-spin"></i>
                        </span>
                        :
                        <span className="ladda-label">
                            <i className="fa fa-plus-circle"> </i>
                            加载更多
                        </span>}
                </button>
                }
            </div>
        )
    }
}