// 显示所有的标签

import React from 'react'
import tiny from '../../assets/imgs/tiny.gif'

/*

 <ul className="sort-tags list-unstyled clearfix">
 <li>
 <a href="javasciript:"
 className={(options.sortName == 'created')&&'active'}
 onClick={this.handleClick(changeSort,{'currentPage':1,'sortName':'created','tagId':''})}>
 最新
 </a>
 </li>
 <li>
 <a href="javasciript:"
 className={(options.sortName == 'visit_count')&&'active'}
 onClick={this.handleClick(changeSort,{'currentPage':1,'sortName':'visit_count','tagId':''})}>
 最热
 </a>
 </li>
 {
 tagList.map((tag,i) => {
 return (
 <li key={i}>
 <a className={(options.tagId == tag)&&'active'}
 href="#"
 onClick={this.handleClick(changeSort,{'currentPage':1,'sortName':'','tagId':tag})}>
 {tag}
 </a>
 </li>
 )
 })
 }
 {isFetching&&
 <li>
 <img src={tiny} alt="" className="loader-tiny"/>
 </li>
 }
 </ul>

 */

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
        console.log(tagList);

        return(
            <div className="body-main">
                <ul className="main-menu main-MC">
                    <li><a href="#"><i> </i>课程库</a>
                        <ul id="main--menu" className="main--menu">
                            <li><a href="#">移动开发</a></li>
                            <li><a href="#">前端开发</a></li>
                            <li><a href="#">后端开发</a></li>
                            <li><a href="#">基础知识</a></li>
                            <li><a href="#">云计算&amp;大数据</a></li>
                            <li><a href="#">智能硬件&amp;物联网</a></li>
                            <li><a href="#">数据库</a></li>
                            <li><a href="#">认证考试</a></li>
                            <li><a href="#">企业IT</a></li>
                            <li><a href="#">设计&amp;产品&amp;测试</a></li>
                        </ul>
                    </li>
                    <li><a href="#"><i> </i>职业路径图</a></li>
                    <li><a href="#"><i> </i>知识体系图</a></li>
                    <li><a href="#"><i> </i>系列课程</a></li>
                    <li><a href="#"><i> </i>课程标签</a></li>
                    <dl id="expandMenu" className="expandMenu">
                        <dt><a href="#">应用开发</a></dt>

                        <dd><a href="#">Android</a></dd>
                        <dd><a href="#">IOS</a></dd>

                        <dt><a href="#">游戏开发</a></dt>
                        <dd><a href="#">Cocos</a></dd>
                        <dd><a href="#">Unity3D</a></dd>
                        <dd><a href="#">SpriteKit</a></dd>
                        <dd><a href="#">2DUnreal</a></dd>

                        <dt><a href="#">常用框架</a></dt>
                        <dd><a href="#">Cordova</a></dd>
                        <dd><a href="#">React&nbsp;Native</a></dd>
                    </dl>
                </ul>
                <div className="main-content main-MC main-c_T">
                    <div className="content-topBar content-t_NL_ATL main-c_T">
                        <dl className="topBar-nav topBar-NL content-t_NL_ATL">
                            <dt className="topBar--pointer content-t_NL_ATL">全部课程</dt>
                            <dd className="topBar--pointer content-t_NL_ATL">
                                <span>最新<i className="indicator"> </i></span>
                                <ul className="hot-menu pointer-menu">
                                    <li><a href="#">最新</a></li>
                                    <li><a href="#">最热</a></li>
                                </ul>
                            </dd>
                            <dd className="topBar--pointer content-t_NL_ATL">
                                <span>课程类型<i className="indicator"> </i></span>
                                <ul className="class-menu pointer-menu">
                                    <li><a href="#">VIP</a></li>
                                    <li><a href="#">免费</a></li>
                                    <li><a href="#">认证专享</a></li>
                                    <li><a href="#">全部</a></li>
                                </ul>
                            </dd>
                            <dd className="topBar--pointer content-t_NL_ATL">
                                <span>内容类型<i className="indicator"> </i></span>
                                <ul className="conte-menu pointer-menu">
                                    <li><a href="#">知识精讲</a></li>
                                    <li><a href="#">项目实战</a></li>
                                    <li><a href="#">全部</a></li>
                                </ul>
                            </dd>
                            <dd className="topBar--pointer content-t_NL_ATL">
                                <span>难度等级<i className="indicator"> </i></span>
                                <ul className="diff-menu pointer-menu">
                                    <li><a href="#">初级</a></li>
                                    <li><a href="#">中级</a></li>
                                    <li><a href="#">高级</a></li>
                                    <li><a href="#">全部</a></li>
                                </ul>
                            </dd>
                        </dl>
                        <div className="topBar-lookWay topBar-NL content-t_NL_ATL">
                            <i className="topBar--pointer lookWay-tile lookWay-TL content-t_NL_ATL"> </i>
                            <i className="topBar--pointer lookWay-list lookWay-TL content-t_NL_ATL"> </i>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}