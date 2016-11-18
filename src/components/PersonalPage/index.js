import React from 'react';
import {Link} from 'react-router';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as actions from '../../actions';
import * as actionCreators from '../../actions/auth';
import Footer from '../Home/footer';
import ScrollTop from '../ScrollTop'
import Logo from '../../assets/images/logo.png';
import User from '../../assets/imgs/user.jpg';

/*

 <nav className="navbar navbar-default row no-yj  navbar-fixed-top self-nav-witdh">
 <div className="">
 <div className="navbar-header">
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
 <a href="#"><img src={Logo} height="30" width="90" alt="logo"/></a>
 </div>
 <div className="collapse navbar-collapse pull-right" id="bs-example-navbar-collapse-1">
 <ul className="nav navbar-nav pull-right">
 <li>
 <a className="dropdown-toggle" data-toggle="dropdown" href="#">
 <i className="glyphicon glyphicon-bell">
 <i className="label label-warning label-nav">
 </i>
 </i>
 </a>
 <ul className="dropdown-menu dropdown-menu-right">
 <li><a href="#"> </a></li>
 </ul>
 </li>
 <li>
 <a className="dropdown-toggle" data-toggle="dropdown" href="#">
 <i className="glyphicon glyphicon-envelope">
 <i className="label label-success label-nav">
 </i>
 </i>
 </a>
 <ul className="dropdown-menu dropdown-menu-right">
 <li><a href="#"> </a></li>
 </ul>
 </li>
 <li>
 <a className="dropdown-toggle" data-toggle="dropdown" href="#">
 <span className="pull-left nav-username">用户名{auth.userName}</span>
 </a>
 <ul className="dropdown-menu dropdown-menu-right clearfix">
 <li className="user-li-head">
 <span> </span>
 <p> </p>
 <p className="text-center"><span>真实姓名{auth.userRealname} </span></p>
 <p className="text-center"><span>邮箱地址{auth.userEmail} </span> </p>
 <p className="text-center"><small><span> </span></small></p>
 </li>
 <li>
 <div className="pull-left">
 <a href="#" className="btn btn-default btn-flat no-yj">资料</a>
 </div>
 <div className="pull-right">
 <a href="#" className="btn btn-default btn-flat no-yj">注销</a>
 </div>
 </li>
 </ul>
 </li>
 </ul>
 </div>
 </div>
 </nav>
 <div className="row">
 <br /><br /><br />
 <div className="nav-left col-md-2 no-padding" id="nav-list-left">
 <div className="user-panel">
 <img src={User} className="img-circle center-block" />
 <p>{auth.userName}</p>
 </div>
 <div className="nav-list" >
 <ul>
 <li>
 <a href="#">个人中心</a>
 </li>
 <li className="nav-left-dropdown">
 <a href="#">用户信息</a>
 <ul className="nav-left-dropdown-menu">
 <li><Link to='/articles'><i className="fa fa-file"> </i>我的文章</Link></li>
 <li><Link to="/comments"><i className="fa fa-comments"> </i>我的评论</Link></li>
 <li><a href="#"><i className="iconfont">&#xe64a;</i>我的问答</a></li>
 <li><a href="#"><i className="iconfont">&#xe644;</i>我的关注</a></li>
 <li><Link to="/reputation"><i className="iconfont">&#xe62d;</i>我的声望</Link></li>
 </ul>
 </li>
 <li className="nav-left-dropdown">
 <a href="#">系统设置</a>
 <ul className="nav-left-dropdown-menu">
 <li><Link to="/users"><i className="fa fa-user"> </i>个人设置</Link></li>
 <li><Link to="/tags"><i className="fa fa-tags"> </i>标签管理</Link></li>
 <li><a href="#"><i className="iconfont">&#xe648;</i>安全中心</a></li>
 </ul>
 </li>
 <li>
 <a href="#">联系客服</a>
 </li>
 <li>
 <Link to="'/">返回首页</Link>
 </li>
 </ul>
 </div>
 </div>
 <div className="main-right  col-md-10 col-md-offset-2">
 </div>
 </div>
 */

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
    
    render(){
        const {children,auth} = this.props;
        console.log(auth);

        return (
            <div>
            </div>
        )
    }
}