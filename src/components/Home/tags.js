// 显示所有的标签

import React from 'react'
import {Link,browserHistory} from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actionCreators from '../../actions/auth';
import * as actions from '../../actions';

import FocusImg1 from '../../assets/images/focus-img1.jpg';
import FocusImg2 from '../../assets/images/focus-img2.jpg';
import FocusImg3 from '../../assets/images/focus-img3.jpg';
import FocusImg4 from '../../assets/images/focus-img4.jpg';
import FocusImg5 from '../../assets/images/focus-img5.jpg';
import FocusImg6 from '../../assets/images/focus-img6.jpg';
import FocusImg7 from '../../assets/images/focus-img7.jpg';
import FocusImg8 from '../../assets/images/focus-img8.jpg';
import WrapperItem1 from '../../assets/images/wrapper-item1.png';
import WrapperItem2 from '../../assets/images/wrapper-item2.jpg';
import WrapperItem3 from '../../assets/images/wrapper-item3.jpg';
import WrapperItem4 from '../../assets/images/wrapper-item4.png';
import WrapperItem5 from '../../assets/images/wrapper-item5.png';
import RLoginIcon from '../../assets/images/r-login-icon.gif';

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

function mapStateToProps(state) {
    return{
        userId: state.auth.userId,
        isAuthenticated: state.auth.isAuthenticated,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actionCreators,dispatch);
}

@connect(mapStateToProps,mapDispatchToProps)
export default class Tags extends React.Component{

    constructor(){
        super();
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(t_tags,show_count){
        actions.getArticleList(t_tags,show_count);
    }

    render(){
        const {tagList,options,changeSort,isFetching} = this.props;
        console.log('tagList:',tagList);

        return(
            <div className="content">
                <div className="focus-page">
                    <div className="con-left">
                        <ul className="con-left-ul">
                            <li className="con-left-li">
                                <a href="">所有标签</a>
                                <div className="lesson-list-detail">
                                    <div className="lesson-list-con">
                                        <dl>
                                            <dt><a href="">
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
                    <div className="con-mid">
                        <div className="focus-con">
                            <span className="left-btn"> </span>
                            <span className="right-btn"> </span>
                            <div className="focus-img">
                                <a href=""><img src={FocusImg1} alt=""/></a>
                                <a href=""><img src={FocusImg2} alt=""/></a>
                                <a href=""><img src={FocusImg3} alt=""/></a>
                                <a href=""><img src={FocusImg4} alt=""/></a>
                                <a href=""><img src={FocusImg5} alt=""/></a>
                                <a href=""><img src={FocusImg6} alt=""/></a>
                                <a href=""><img src={FocusImg7} alt=""/></a>
                                <a href=""><img src={FocusImg8} alt=""/></a>
                            </div>
                            <div className="focus-num">
                            </div>
                        </div>
                        <div className="focus-wrapper">
                            <div className="focus-item">
                                <span className="s-focus-left-btn"> </span>
                                <span className="s-focus-right-btn"> </span>
                                <ul className="items-ul">
                                    <li>
                                        <a href=""><img src={WrapperItem1} alt=""/>
                                            <p>iOS相关话题</p>
                                        </a>
                                    </li>
                                    <li>
                                        <a href=""><img src={WrapperItem2} alt=""/>
                                            <p>JavaWeb相关话题</p>
                                        </a>
                                    </li>
                                    <li>
                                        <a href=""><img src={WrapperItem3} alt=""/>
                                            <p>后端相关话题</p>
                                        </a>
                                    </li>
                                    <li>
                                        <a href=""><img src={WrapperItem4} alt=""/>
                                            <p>HTML5/Web相关话题</p>
                                        </a>
                                    </li>
                                    <li>
                                        <a href=""><img src={WrapperItem5} alt=""/>
                                            <p>Android相关话题</p>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="con-right">
                        <div className="right-news">
                            <h3>论坛公告</h3>
                            <ul className="news-ul">
                                <li><a href="">实验班问答交流平台开放通知</a></li>
                                <li className="items"><a href="">本平台的使用指南，可以不看</a></li>
                                <li className="bolder-item"><a href="">给点建议，让本平台变得更好</a></li>
                                <li className="items"><a href="">使用的技术，有兴趣可以了解一下</a></li>
                            </ul>
                        </div>
                        <div className="right-login">
                            <div className="r-user-con">
                                <img src={RLoginIcon} alt=""/>
                            </div>
                            {
                                this.props.isAuthenticated
                                    ?
                                    <div className="r-user-login">
                                        <div className="hello-word">
                                            <span>Hi!你好</span>
                                            <p>这是实验班问答交流平台</p>
                                        </div>
                                        <div className="login-btn-con">
                                            <Link to="/login" className="login-btn">退出</Link>
                                        </div>
                                    </div>
                                    :
                                    <div className="r-user-login">
                                        <div className="hello-word">
                                            <span>Hi!你好</span>
                                            <p>这是实验班问答交流平台</p>
                                        </div>
                                        <div className="login-btn-con">
                                            <Link to="/login" className="login-btn">登录</Link>
                                            <Link to="/register" className="register">注册</Link>
                                        </div>
                                    </div>
                            }
                        </div>
                        <br />
                        <ul className="news-ul text-center">
                            <li className=""><a href="">(1)可以显示一些固定的通知</a></li>
                            <li className="items"><a href="">(2)或者显示活跃的用户排行</a></li>
                            <li className=""><a href="">(3)也可以是还能添加的功能</a></li>
                            <li className="items"><a href="">(4)还可以是正在挖掘的技术</a></li>
                            <li className=""><a href="">(5)可以加些有所帮助的内容</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}