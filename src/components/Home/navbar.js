// 页头导航

import React from 'react';
import {Link,browserHistory} from 'react-router';
import Alert from 'react-s-alert';
import $ from 'jquery';

import {API_ROOT} from '../../config';

import Logo from '../../assets/images/logo.png';
import StarIcon from '../../assets/images/star-icon.png';
import DownLoad from '../../assets/images/download.png';

export default class Navbar extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            open: false,
            isDown:true,
            searchWord:'',
            searchIds:'',
        };
        this.handleScroll = this.handleScroll.bind(this);
        this.changValue = this.changValue.bind(this);
    }

    componentDidMount(){
        window.addEventListener('scroll',this.handleScroll)
    }

    changValue(e){
        this.setState({searchWord:e.target.value});
    }

    handleSubmit(e){
        e.preventDefault();

        let url = API_ROOT + 'search';
        $.get(
            url,
            {word:this.state.searchWord},
            function (data) {
                if(data.code == 1){
                    console.log('about the search result:',data);
                   // this.setState({searchIds:data});
                    this.props.setSearchIds(data);
                    browserHistory.push('/search');
                } else {
                    let content = '查询失败，输入信息有误，请重新输入';
                    let type = 'error';
                    if(content !== '' && type) {
                        switch (type) {
                            case 'error':
                                Alert.error(content);
                                break;
                            case 'success':
                                Alert.success(content);
                                break;
                            case 'info':
                                Alert.info(content);
                                break;
                            case 'warning':
                                Alert.warning(content);
                                break;
                            default:
                                Alert.error(content)
                        }
                    }
                }
            }.bind(this)
        )
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

    render(){
        return (
            <div className="container menu-outer">
                <Alert stack={{limit:1}} position='top-right' timeout={3000}/>
                <header className="header">
                    <div className="search">
                        <div className="logo">
                            <img src={Logo} height="100" width="300" alt="logo"/>
                        </div>
                        <div className="search-input">
                            <input type="text"
                                   value={this.state.searchWord}
                                   placeholder="搜索文章或者问答或者用户"
                                   className="search-text"
                                   ref="search"
                                   onChange={this.changValue}/>
                                <div className="hot-words">
                                    <a href="#">Android</a>
                                    <a href="#">iOS</a>
                                    <a href="#">HTML5</a>
                                </div>
                                <input type="submit" className="submit-btn" value="" onClick={(e)=>this.handleSubmit(e)} />
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
                            <Link to="/homequestion">
                                问答
                            </Link>
                            <ul className="nav-hide-ul">
                                <li className="nav-hide-li">
                                    <span> </span>
                                    <ul className="bar-hide-ul">
                                        <li><a href="">所有文章</a></li>
                                        <li><Link to='/homearticlehot'>热门文章</Link></li>
                                        <li><Link to='/homearticle'>最新文章</Link></li>
                                        <li><a href="">推荐文章</a></li>
                                    </ul>
                                </li>
                                <li className="nav-hide-li">
                                    <span> </span>
                                    <ul className="bar-hide-ul">
                                        <li><a href="">所有问答</a></li>
                                        <li><Link to='/homequestion'>最新问答</Link></li>
                                        <li><Link to='/homequestionhot'>热门问答</Link></li>
                                        <li><a href="">优质问答</a></li>
                                    </ul>
                                </li>
                            </ul>
                        </nav>
                        <nav className="users">
                            <a href="#">
                                {
                                    sessionStorage.getItem('u_id') === null
                                        ?
                                        <span>&nbsp;</span>
                                        :
                                        <span className="users-icon">
                                            <img src={StarIcon} alt=""/>
                                            <Link to='/writeq'>提问题</Link>
                                        </span>
                                }
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
