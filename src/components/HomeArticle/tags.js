// 显示所有的标签

import React from 'react'
import tiny from '../../assets/imgs/tiny.gif'

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

    render(){
        const {tagList,options,changeSort,isFetching} = this.props;
        console.log('tagList:',tagList);

        return(
            <div className="body-main">
                <ul className="main-menu main-MC">
                    <li>
                        <ul id="main--menu" className="main--menu">
                            <li><a href="#">全部标签</a></li>
                            <li className="con-left-li"><a href="#">ios</a></li>
                            <li className="con-left-li"><a href="#">android</a></li>
                            <li className="con-left-li"><a href="#">linux</a></li>
                            <li className="con-left-li"><a href="#">windows</a></li>
                            <li className="con-left-li"><a href="#">后端开发</a></li>
                            <li className="con-left-li"><a href="#">前端开发</a></li>
                            <li className="con-left-li"><a href="#">数据库</a></li>
                            <li className="con-left-li"><a href="#">云计算</a></li>
                            <li className="con-left-li"><a href="#">服务器</a></li>
                        </ul>
                    </li>
                    <dl id="expandMenu" className="expandMenu">
                        <dt><a href="#"
                               onClick={e => this.handleClick()}>所有标签</a>
                        </dt>
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
                </ul>
                <div className="main-content main-MC main-c_T">
                    <div className="content-topBar content-t_NL_ATL main-c_T">
                        <dl className="topBar-nav topBar-NL content-t_NL_ATL">
                            <dt className="topBar--pointer content-t_NL_ATL">全部文章</dt>
                            <dd className="topBar--pointer content-t_NL_ATL">
                                <span>最新<i className="indicator"> </i></span>
                                <ul className="hot-menu pointer-menu">
                                    <li><a href="#">最新</a></li>
                                    <li><a href="#">最热</a></li>
                                </ul>
                            </dd>
                        </dl>
                        <div className="topBar-lookWay topBar-NL content-t_NL_ATL">
                            <i className="topBar--pointer lookWay-tile lookWay-TL content-t_NL_ATL"> </i>
                            <i className="topBar--pointer lookWay-list lookWay-TL content-t_NL_ATL"> </i>
                        </div>
                    </div>
                </div>

                <div className="content-shelf">
                    <div className="shelf-exhibit">
                        <div className="exhibit-photoFrame">
                        </div>
                        <div className="exhibit-describe">
                            <h4> </h4>
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

            </div>
        )
    }
}