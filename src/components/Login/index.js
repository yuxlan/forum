// 登录

import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Link} from 'react-router';

import * as actionCreators from '../../actions/auth';
import * as actions from '../../actions';
// import SNSLogin from './snsLogin'; // 第三方登录，后期可加   <SNSLogin logins={sns.logins}/>


function mapStateToProps(state) {
    return{
        isAuthenticating: state.auth.isAuthenticating,
        statusText: state.auth.statusText,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actionCreators,dispatch);
}

@connect(mapStateToProps,mapDispatchToProps)
export default class Login extends React.Component{
    constructor(props){
        super(props);
        const redirectRoute = '/login';
        this.state = {
            u_loginname: '',
            u_psw:'',
            u_loginname_error_text:null,
            u_psw_error_text:null,
            redirectTo:redirectRoute,
            disabled: true,
        };
    }

    isDisabled(){
        let u_loginname_is_valid = false;
        let u_psw_is_valid = false;

        if(this.state.u_loginname === ''){
            this.setState({
                u_loginname_error_text:'请输入用户名或邮箱',
            });
        }
        else {
            u_loginname_is_valid = true;
            this.setState({
                u_loginname_error_text:null,
            });
        }

        if (this.state.u_psw === ''){
            this.setState({
                u_psw_error_text:'请输入密码',
            });
        }
        else {
            u_psw_is_valid = true;
            this.setState({
                u_psw_error_text:null
            })
        }

        if (u_loginname_is_valid && u_psw_is_valid) {
            this.setState({
                disabled:false,
            });
        }

    }

    changeValue(e,type) {
        const value = e.target.value;
        const next_state = {};
        next_state[type] = value;
        this.setState(next_state,() => {
            this.isDisabled();
        });
    }

    _handleKeyPress(e) {
        if (e.key === 'Enter') {
            if (!this.state.disabled) {
                this.login(e);
            }
        }
    }

    login(e) {
        e.preventDefault();
        localStorage.setItem('u_psw',this.state.u_psw);
        actions.loginUser(this.state.u_loginname,this.state.u_psw, this.state.redirectTo);
    }

    render(){
        const style={display: 'block',width: '100%',margin:'0px',};
        return (
            <div className="main">
                <h1>实验班问答交流平台</h1>
                <div className="login-form">
                    <div className="login-left">
                        <div className="logo">
                            <h2>欢迎回来</h2>
                            <p> </p>
                        </div>
                        <div className="social-icons">
                            <ul>
                            </ul>
                        </div>
                    </div>
                    <div className="login-right">
                        <div className="sap_tabs">
                            <div id="horizontalTab" style={style}>
                                <ul className="resp-tabs-list">
                                    <li className="resp-tab-item" aria-controls="tab_item-0" role="tab"><span>登录</span></li>
                                    <div className="clear"> </div>
                                </ul>
                                <div className="resp-tabs-container">
                                    <div className="tab-1 resp-tab-content" aria-labelledby="tab_item-0">
                                        <div className="login-top">
                                            {
                                                this.props.statusText &&
                                                <div className="alert alert-info">
                                                    {this.props.statusText}
                                                </div>
                                            }
                                            <form   onKeyPress={(e) => this._handleKeyPress(e)}>
                                                <input type="text"
                                                       className="email"
                                                       ref="u_loginname"
                                                       placeholder="用户名"
                                                       required=""
                                                       onChange={(e) => this.changeValue(e,'u_loginname')}/>
                                                <span className='help-block'>
                                                    {this.state.u_loginname_error_text}
                                                </span>
                                                <input type="password"
                                                       className="password"
                                                       ref="u_psw"
                                                       placeholder="密码"
                                                       required=""
                                                       onChange={(e) => this.changeValue(e,'u_psw')}/>
                                                <span className='help-block'>
                                                    {this.state.u_psw_error_text}
                                                </span>
                                            </form>
                                            <div className="login-text">
                                                <ul>
                                                    <li><label><input type="checkbox" value="Remember-Me" /> 记住密码？</label></li>
                                                    <li><Link to="/register">前往注册 >></Link></li>
                                                </ul>
                                            </div>
                                            <div className="login-bottom login-bottom1">
                                                <div className="submit">
                                                    <form>
                                                        <input type="submit"
                                                               value="登录"
                                                               disabled={this.state.disabled}
                                                               onClick={(e) => this.login(e)}/>
                                                    </form>
                                                </div>
                                                <ul>
                                                    <li><p>通过其它方式登录</p></li>
                                                    <li><a href="#"><i className="iconfont">&#xe620;</i></a></li>
                                                    <li><a href="#" className="twt"><i className="iconfont">&#xe63a;</i></a></li>
                                                    <li><a href="#" className="ggl"><i className="iconfont">&#xe602;</i></a></li>
                                                </ul>
                                                <div className="clear"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="clear"> </div>
                </div>
            </div>
        )
    }
}

Login.propTypes ={
    loginUser: React.PropTypes.func,
    statusText: React.PropTypes.string,
};