import React from 'react';
import {Link,browserHistory} from 'react-router';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Alert from 'react-s-alert';

import * as actionCreators from '../../actions/auth';

import Footer from '../Home/footer';
import ScrollTop from '../ScrollTop'

import Logo from '../../assets/imgs/logo.png';
import AppPic from '../../assets/imgs/headerwm.png';

const mapStateToProps =  (state) => {
    return {
        auth:state.auth.toJS(),
    }
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(actionCreators,dispatch);
};

@connect(mapStateToProps,mapDispatchToProps)
export default class Admin extends React.Component{
    constructor(props){
        super(props);
    }

    componentDidMount(){
        if(sessionStorage.getItem('u_email_confirm') == 0 ) {
            let content = '您的邮箱还未验证，存在一定风险，请前往验证';
            let type = 'warning';
            if (content !== '' && type) {
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
    }

    logout(e){
        e.preventDefault();
        sessionStorage.removeItem('u_id','u_name');
        browserHistory.push('/');
        this.setState({
            open:false,
        });
    }

    render(){
        const {auth,children} = this.props;
        console.log(auth);

        return (
            <div className="personal">
                <Link to="/verifyemail">
                    <Alert stack={{limit:1}} position='top-right' timeout={5000}/>
                </Link>
                <nav className="body-top">
                    <div className="body-top-inner menu-outer slide-down">
                        <img src={Logo} alt=""/>
                        <nav id="nav-main">
                            <ul className="nav-main">
                                <li className="nav-li">
                                    <h2>
                                        <Link to="/">首页</Link>
                                        <i className="indicator"> </i>
                                    </h2>
                                </li>
                                <li className="nav-li">
                                    <h2>
                                        <Link to="/homearticle">文章</Link>
                                        <i className="indicator"> </i>
                                    </h2>
                                    <ul className="nav-menu nav-menu-2">
                                        <li><a href="#">所有文章</a></li>
                                        <li><a href="#">热门文章</a></li>
                                        <li><a href="#">最新文章</a></li>
                                        <li><a href="#">推荐文章</a></li>
                                    </ul>
                                </li>
                                <li className="nav-li">
                                    <h2>
                                        <Link to="/homequestion">问答</Link>
                                        <i className="indicator"> </i>
                                    </h2>
                                    <ul className="nav-menu nav-menu-2">
                                        <li><a href="#">所有问答</a></li>
                                        <li><a href="#">未解决问答</a></li>
                                        <li><a href="#">已解决问答</a></li>
                                        <li><a href="#">优质问答</a></li>
                                    </ul>
                                </li>
                            </ul>
                        </nav>
                        <ul id="tools" className="tools">
                            <li id="search-icon">
                                <i className="tools-icon search-icon "> </i>
                            </li>
                            <li>
                                <i className="tools-icon app-icon"> </i>
                                <div className="QRCode-menu">
                                    <i className="hump QRCode-hump"> </i>
                                    <img src={AppPic} alt="" className="hjl-avatar"/>
                                </div>
                            </li>
                            <li>
                                <i className="tools-icon login-icon"> </i>
                                <ul className="login-menu">
                                    <i className="hump login-hump"> </i>
                                    <li>
                                        <Link to="/personalpage">user_{sessionStorage.getItem('u_name')}</Link>
                                    </li>
                                    <li>
                                        <hr />
                                    </li>
                                    <li>
                                        <Link to="/personalpage/articles">我的文章</Link>
                                    </li>
                                    <li>
                                        <Link to="/personalpage/articles">我的问答</Link>
                                    </li>
                                    <li>
                                        <Link to="/personalpage/users">个人设置</Link>
                                    </li>
                                    <li>
                                        <hr />
                                    </li>
                                    <li>
                                        <a href="#" onClick={e => this.logout(e)}>退出</a>
                                    </li>
                                </ul>
                            </li>
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
                </nav>
                <br /><br /><br /><br />

                <div className="admin-container">
                    <div className="admin-controller col-sm-2">
                        <div className="controller-menu">
                            <div className="fix"></div>
                                <Link to="/personalpage/users" className="controller-item" activeClassName="active" title="" >
                                    <i className="fa fa-user"> </i>个人设置
                                </Link>
                            <div className="fix"></div>
                                <Link to='/personalpage/articles' className="controller-item" activeClassName="active" title="" >
                                    <i className="fa fa-file"> </i>我的文章
                                </Link>
                            <div className="fix"></div>
                                <Link to="/personalpage/comments" className="controller-item" activeClassName="active" title="" >
                                    <i className="fa fa-comments"> </i>我的评论
                                </Link>
                            <div className="fix"></div>
                                <Link to='/personalpage/questions' className="controller-item" activeClassName="active" title="" >
                                    <i className="iconfont">&#xe64a;</i>我的问答
                                </Link>
                            <div className="fix"></div>
                                <a href="#" className="controller-item" activeClassName="active" title="" >
                                    <i className="iconfont">&#xe644;</i>我的关注
                                </a>
                            <div className="fix"></div>
                                <Link to="/reputation" className="controller-item" activeClassName="active" title="" >
                                    <i className="iconfont">&#xe62d;</i>我的声望
                                </Link>
                            <div className="fix"></div>
                                <Link to="/tags" className="controller-item" activeClassName="active" title="" >
                                    <i className="fa fa-tags"> </i>标签管理
                                </Link>
                            <div className="fix"></div>
                                <a href="#" className="controller-item" activeClassName="active" title="" >
                                    <i className="iconfont">&#xe648;</i>安全中心
                                </a>
                            <div className="fix"></div>
                                <a href="#" className="controller-item" activeClassName="active" title="" >
                                    <i className="iconfont">&#xe60c;</i>联系客服
                                </a>
                            <div className="fix"></div>
                                <Link to="/" className="controller-item" title="" >
                                    <i className="iconfont">&#xe632;</i>返回首页
                                </Link>
                            <div className="fix"></div>
                        </div>
                    </div><br /><br /><br />
                </div>

                <div>
                    {children}
                </div>

                <br /><br /><br /><br /><br /><br /><br />
                <ScrollTop/>
                <Footer/>
            </div>
        )
    }
}