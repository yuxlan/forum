// 页头导航

import React from 'react';
import {Link,browserHistory} from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Logo from '../../assets/images/logo.png';
import StarIcon from '../../assets/images/star-icon.png';
import DownLoad from '../../assets/images/download.png';

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
        this.props.logoutAndRedirect();
        this.setState({
            open:false,
        });
    }

    openNav(){
        this.setState({
            open:true,
        });
    }

    searchAll(){
    }

    changeValue(){
    }

    render(){
        return (
            <div className="container menu-outer">
                <header className="header">
                    <div className="search">
                        <div className="logo">
                            <img src={Logo} height="100" width="300" alt="logo"/>
                        </div>
                        <div className="search-input">
                            <input type="text"
                                   value=""
                                   placeholder="搜索文章或者问答"
                                   className="search-text"
                                   ref="search"/>
                                <div className="hot-words">
                                    <a href="#">Android</a>
                                    <a href="#">iOS</a>
                                    <a href="#">HTML5</a>
                                </div>
                                <input type="submit" className="submit-btn" value="" />
                        </div>
                        {
                            sessionStorage.getItem('u_id') === null
                                ?
                            <div className="personal-infor">
                                <Link to="/login">登录</Link>
                                <span>|</span>
                                <Link to="/register">注册</Link>
                            </div>
                                :
                                <div className="personal-infor">
                                    欢迎回来，
                                    <Link to="/personalpage">
                                        user_{sessionStorage.getItem('u_name')}
                                    </Link>
                                </div>
                    }
                    </div>
                </header>
                <div className="load-line"></div>
                <div className="nav-bar">
                    <div id="nav-bar">
                        <nav className="navbar">
                            <Link to="/">
                                首页
                            </Link>
                            <Link to="/homearticle">
                                文章
                            </Link>
                            <a href="#">
                                问答
                            </a>
                            <ul className="nav-hide-ul">
                                <li className="nav-hide-li">
                                    <span> </span>
                                    <ul className="bar-hide-ul">
                                        <li><a href="">所有文章</a></li>
                                        <li><a href="">最新文章</a></li>
                                        <li><a href="">热门文章</a></li>
                                        <li><a href="">推荐文章</a></li>
                                    </ul>
                                </li>
                                <li className="nav-hide-li">
                                    <span> </span>
                                    <ul className="bar-hide-ul">
                                        <li><a href="">所有问答</a></li>
                                        <li><a href="">已解决问答</a></li>
                                        <li><a href="">未解决问答</a></li>
                                        <li><a href="">优质问答</a></li>
                                    </ul>
                                </li>
                            </ul>
                        </nav>
                        <nav className="users">
                            <a href="#">
                        <span className="users-icon">
                            <img src={StarIcon} alt=""/>
                            求助
                        </span>
                            </a>
                            &nbsp;&nbsp;&nbsp;&nbsp;
                            <a href="#">
                        <span className="users-icon">
                            <img src={DownLoad} alt=""/>
                            APP下载
                        </span>
                            </a>
                        </nav>
                    </div>
                </div>
            </div>
        )
    }
}

Navbar.propTypes = {
    logoutAndRedirect: React.PropTypes.func,
    isAuthenticated: React.PropTypes.bool,
};