// 页头导航

import React from 'react';
import {Link,browserHistory} from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Dropdown} from 'react-bootstrap';
import Logo from '../../assets/imgs/logo.png';
import AppPic from '../../assets/imgs/headerwm.png';

import * as actionCreators from '../../actions/auth';

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
export default class Navbar extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            open: false,
            isDown:true
        };

        this.handleScroll = this.handleScroll.bind(this);
    }
    componentDidMount(){
        window.addEventListener('scroll',this.handleScroll)
    }
    handleScroll(){
        if(window.scrollY > 50){
            this.setState({
                isDown:false
            })
        }else{
            this.setState({
                isDown:true
            })
        }
    }
    dispatchNewRoute(route) {
        browserHistory.push(route);
        this.setState({
            open:false,
        });
    }
    handleClickOutside(){
        this.setState({
            open:false,
        });
    }
    logout(e){
        e.preventDefault();
        sessionStorage.removeItem('u_id','u_name');
        browserHistory.push('/');
     //   this.props.logoutAndRedirect();
        this.setState({
            open:false,
        });
    }
    openNav(){
        this.setState({
            open:true,
        });
    }

    render(){
        return (
                <header className="body-top">
                    <div className="body-top-inner menu-outer slide-down">
                        <img src={Logo} alt=""/>
                        <nav id="nav-main">
                            <ul className="nav-main">
                                <li className="nav-li">
                                    <h2><Link to="/">首页</Link><i className="indicator"> </i></h2></li>
                                <li className="nav-li">
                                    <h2><Link to="/homearticle">文章</Link><i className="indicator"> </i></h2>
                                    <dl className="nav-menu nav-menu-1">
                                        <dd><a href="#">所有文章</a></dd>
                                        <dd><Link to='/homearticlehot'>热门文章</Link></dd>
                                        <dd><Link to='/homearticle'>最新文章</Link></dd>
                                        <dd><a href="#">推荐文章</a></dd>
                                    </dl>
                                </li>
                                <li className="nav-li">
                                    <h2><Link to="/homequestion">问答</Link><i className="indicator"> </i></h2>
                                    <ul className="nav-menu nav-menu-2">
                                        <li><a href="#">所有问答</a></li>
                                        <li><Link to='/homequestion'>最新问答</Link></li>
                                        <li><Link to='/homequestionhot'>热门问答</Link></li>
                                        <li><a href="#">优质问答</a></li>
                                    </ul>
                                </li>
                            </ul>
                        </nav>
                        <ul id="tools" className="tools">
                            <li id="search-icon"><i className="tools-icon search-icon "> </i></li>
                            <li><i className="tools-icon app-icon"> </i>
                                <div className="QRCode-menu">
                                    <i className="hump QRCode-hump"> </i>
                                    <img src={AppPic} alt="" className="hjl-avatar"/>
                                </div>
                            </li>
                            {
                                sessionStorage.getItem('u_id') === null
                                    ?
                                <li>
                                    <i className="tools-icon login-icon"> </i>
                                    <ul className="login-menu">
                                        <i className="hump login-hump"> </i>
                                        <li>
                                            <Link to="/login">登录</Link>
                                            <span>|</span>
                                            <Link to="/register">注册</Link></li>
                                    </ul>
                                </li>
                                    :
                                    <li>
                                        <i className="tools-icon login-icon"> </i>
                                        <ul className="login-menu">
                                            <i className="hump login-hump"> </i>
                                            <li><Link to="/personalpage">user_{sessionStorage.getItem('u_name')}</Link></li>
                                            <li><hr /></li>
                                            <li><Link to="/personalpage/articles">我的文章</Link></li>
                                            <li><Link to="/personalpage/questions">我的问答</Link></li>
                                            <li><Link to="/personalpage/users">个人设置</Link></li>
                                            <li><hr /></li>
                                            <li><a href="#" onClick={e => this.logout(e)}>退出</a></li>
                                        </ul>
                                    </li>
                        }
                        </ul>
                        <form action="#" method="get" id="search-bar" className="search-bar">
                            <i className="search-bar-icon"> </i>
                            <input type="text" name="search" placeholder="搜索文章或者问答"/>
                                <span>Android</span>
                                <span>IOS</span>
                                <span>HTML5</span>
                                <i id="search-close" className="close">×</i>
                        </form>
                    </div>
                </header>
        )
    }
}

Navbar.propTypes = {
    logoutAndRedirect: React.PropTypes.func,
    isAuthenticated: React.PropTypes.bool,
};