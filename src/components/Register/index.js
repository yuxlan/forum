// 注册表单

import React from 'react';
import {Link} from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as actionCreators from '../../actions/auth';
import * as actions from '../../actions';
import { validateEmail, validateUsername } from '../../utiles/misc';



function mapStateToProps(state) {
    return{
        isRegistering: state.auth.isRegistering,
        registerStatusText: state.auth.registerStatusText,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actionCreators,dispatch);
}

@connect(mapStateToProps, mapDispatchToProps)
export default class Register extends React.Component {
    constructor(props){
        super(props);
        const redirectRoute = '/login';
        this.state = {
            u_name:'',
            u_email:'',
            u_psw:'',
            psw_again:'',
            u_name_error_text: null,
            u_email_error_text: null,
            u_psw_error_text: null,
            psw_again_error_text: null,
            redirectTo: redirectRoute,
            disabled: true,
        };
    }

    isDisabled() {
        let u_name_is_valid = false;
        let u_email_is_valid = false;
        let u_psw_is_valid = false;
        let psw_again_is_valid = false;

        if(this.state.u_name === '') {
            this.setState({
                u_name_error_text: '对不起，请输入用户名',
            });
        }
        else if (validateUsername(this.state.u_name)) {
            u_name_is_valid = true;
            this.setState({
                u_name_error_text: null,
            });
        }
        else {
            this.setState({
                u_name_error_text: '对不起，这是一个无效的用户名，用户名应以小写字母开头，由小写字母和数字组成',
            });
        }

        if(this.state.u_email === ''){
            this.setState({
                u_email_error_text: '对不起，请输入邮箱',
            });
        }
        else if (validateEmail(this.state.u_email)) {
            u_email_is_valid = true;
            this.setState({
                u_email_error_text: null,
            });
        }
        else {
            this.setState({
                u_email_error_text: '对不起，这是一个无效的邮箱地址格式，请仔细检查后再次输入',
            });
        }

        if (this.state.u_psw === '' || ! this.state.u_psw) {
            this.setState({
                u_psw_error_text: '对不起，请输入密码',
            });
        }
        else if (this.state.u_psw.length >= 6 && this.state.u_psw.length <= 16) {
            u_psw_is_valid = true;
            this.setState({
                u_psw_error_text: null,
            });
        }
        else {
            this.setState({
                u_psw_error_text: '对不起，您的密码长度应该保持在6——16个字符内',
            });
        }

        if (this.state.psw_again === '' || ! this.state.psw_again) {
            this.setState({
                psw_again__error_text: '对不起，请再次输入密码',
            });
        }
        else if (this.state.psw_again === this.state.u_psw) {
            psw_again_is_valid = true;
            this.setState({
                psw_again_error_text: null,
            });
        }
        else {
            this.setState({
                psw_again_error_text: '对不起，您的两次密码不一致',
            });
        }

        if(u_name_is_valid && u_email_is_valid && u_psw_is_valid && psw_again_is_valid) {
            this.setState({
                disabled: false,
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

    _handleKeyPress(e){
        if (e.key === 'Enter') {
            if (!this.state.disabled) {
                this.login(e);
            }
        }
    }

    login(e) {
        e.preventDefault();
        localStorage.setItem('u_psw',this.state.u_psw);
        actions.registerUser(this.state.u_email, this.state.u_name, this.state.u_psw);
    }

    render(){
        const style={display: 'block',width: '100%',margin:'0px',};
        return(
            <div className="main">
                <h1>实验班问答交流平台</h1>
                <div className="login-form">
                    <div className="login-left">
                        <div className="logo">
                            <h2>您好</h2>
                            <p>欢迎成为本平台用户</p>
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
                                    <li className="resp-tab-item" aria-controls="tab_item-1" role="tab"><span>注册</span></li>
                                    <div className="clear"> </div>
                                </ul>
                                    <div className="tab-1 resp-tab-content" aria-labelledby="tab_item-1">
                                        <div className="login-top sign-top">
                                            {
                                                this.props.statusText &&
                                                <div className="alert alert-info">
                                                    {this.props.statusText}
                                                </div>
                                            }
                                            <form onKeyPress={(e) => this._handleKeyPress(e)}>
                                                <input type="text"
                                                       className="name active"
                                                       ref='u_name'
                                                       autoFocus
                                                       placeholder="用户名"
                                                       required=""
                                                       onChange={(e) => this.changeValue(e,'u_name')}/>
                                                <span className='help-block'>
                                                    {this.state.u_name_error_text}
                                                </span>
                                                <input type="e-mail"
                                                       className="email"
                                                       ref='email'
                                                       autoFocus
                                                       placeholder="邮箱"
                                                       required=""
                                                       onChange={(e) => this.changeValue(e,'u_email')}/>
                                                <span className='help-block'>
                                                    {this.state.u_email_error_text}
                                                </span>
                                                <input type="password"
                                                       className="password"
                                                       ref='psw'
                                                       autoFocus
                                                       placeholder="密码"
                                                       required=""
                                                       onChange={(e) => this.changeValue(e,'u_psw')}/>
                                                <span className='help-block'>
                                                    {this.state.u_psw_error_text}
                                                </span>
                                                <input type="password"
                                                       className="password"
                                                       ref='pswagain'
                                                       autoFocus
                                                       placeholder="确认密码"
                                                       required=""
                                                       onChange={(e) => this.changeValue(e,'psw_again')}/>
                                                <span className='help-block'>
                                                    {this.state.psw_again_error_text}
                                                </span>
                                            </form>
                                            <div className="login-text">
                                                <ul>
                                                    <li><Link to="/">返回首页 >> </Link></li>
                                                </ul>
                                            </div>
                                            <div className="login-bottom">
                                                <div className="submit">
                                                    <form>
                                                        <input type="submit"
                                                               value="注册"
                                                               disabled={this.state.disabled}
                                                               onClick={(e) => this.login(e)}/>
                                                    </form>
                                                </div>
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
        )
    }
}

Register.propTypes = {
    registerUser: React.PropTypes.func,
    registerStatusText: React.PropTypes.string,
};
