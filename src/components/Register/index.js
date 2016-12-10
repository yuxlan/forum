// 注册表单

import React from 'react';
import {Link,browserHistory} from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../../actions';
import { validateEmail, validateUsername } from '../../utiles/misc';
import {API_ROOT} from '../../config';
import $ from 'jquery';
import Alert from 'react-s-alert';
import Footer from '../HomeArticleHot/footer';

function mapStateToProps(state) {
    return{
        isRegistering: state.auth.isRegistering,
        registerStatusText: state.auth.registerStatusText,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions:bindActionCreators(Actions,dispatch)
    }
}

@connect(mapStateToProps, mapDispatchToProps)
export default class Register extends React.Component {
    constructor(props){
        super(props);
        const redirectRoute = '/login';
        this.state = {
            verifyNum:'',
            u_name:'',
            u_email:'',
            u_psw:'',
            psw_again:'',
            u_verify:'',
            u_name_error_text: null,
            u_email_error_text: null,
            u_psw_error_text: null,
            psw_again_error_text: null,
            verify_error_text: null,
            redirectTo: redirectRoute,
            disabled: true,
        };
    }

    componentDidMount(){
        console.log('get verify first');

        let url = API_ROOT + 'public/get_verify';
        $.get(url,
            function (data) {
                console.log('get Verify Number:',data);
                this.setState({verifyNum:data});
            }.bind(this)
        )
    }

    changeVerifyNum(e){
        let url = API_ROOT + 'public/get_verify';
        $.get(url,
            function (data) {
                console.log('get Verify Number again:',data);
                this.setState({verifyNum:data});
            }.bind(this)
        )
    }

    isDisabled() {
        let u_name_is_valid = false;
        let u_email_is_valid = false;
        let u_psw_is_valid = false;
        let psw_again_is_valid = false;
        let verify_is_valid = false;

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

        if(this.state.u_verify === ''){
            this.setState({
                verify_error_text:'请输入验证码',
            });
        }
        else if(this.state.u_verify === this.state.verifyNum){
            sessionStorage.setItem('verify',this.state.u_verify);
            verify_is_valid = true;
            this.setState({verify_error_text:null});
        }
        else {
            this.setState({verify_error_text:'验证码错误，请重新输入'})
        }

        if(u_name_is_valid && u_email_is_valid && u_psw_is_valid && psw_again_is_valid && verify_is_valid) {
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

    getUserInfo(u_id){
        let url = API_ROOT + 'u/query';
        let verifyurl = API_ROOT + 'u/email/verify';
        $.get(url,{u_id:u_id},
            function (data) {
                console.log('getUserInfo:',data);
                if(data.code == 1){
                    sessionStorage.setItem('u_name',data.u_name);
                    sessionStorage.setItem('u_email',data.u_email);
                    $.post(verifyurl,{u_id:sessionStorage.getItem('u_id'),u_email:sessionStorage.getItem('u_email'),u_verify:sessionStorage.getItem('verify')},
                        function (data) {
                            console.log('sendVerifyEmail:',data);
                            if(data.code == 1){
                                browserHistory.push('/verifyemail');
                            }else {
                                let content = '注册失败';
                                let type = 'error';
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
                        })
                }else{
                    let content = data.codeState;
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
                }})
    };

    registerUser(u_email,u_name,u_psw){
        sessionStorage.setItem('u_psw',u_psw);
        let url = API_ROOT + 'sign_up';
        $.post(url,{u_email:u_email,u_name:u_name,u_psw:u_psw},
            function(data){
                console.log('userRegister',data);
                if(data.code == 1) {
                    sessionStorage.setItem('u_id',data.u_id);
                    return this.getUserInfo(sessionStorage.getItem('u_id'));
                }else {
                    let content = data.codeState;
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
            }.bind(this))
    };

    login(e) {
        e.preventDefault();
      //  const {actions} = this.props;
       // actions.registerUser(this.state.u_email, this.state.u_name, this.state.u_psw, this.state.redirectTo);
        this.registerUser(this.state.u_email, this.state.u_name, this.state.u_psw);
    }

    render(){
        return(
        <div className="hintemail-bg">
            <Alert stack={{limit:1}} position='top-right' timeout={3000}/>
            <div className="container">
                <div className='row flipInX'>
                    <div className='col-sm-8'>
                        <h3 className="text-center signtitle">
                            <br/>
                            <br/>
                            <br/>
                            <br/>
                            <br/>
                        </h3>
                        <h4 className="text-center"><strong>欢迎成为本站用户</strong></h4>
                        <br />
                        {
                            this.props.registerStatusText &&
                            <div className="alert alert-info">
                                {
                                    this.props.registerStatusText
                                }
                            </div>
                        }
                        <div className='panel panel-default'>
                            <div className='panel-heading'>
                                用户注册
                            </div>
                            <div className='panel-body'>
                                <form onKeyPress={(e) => this._handleKeyPress(e)}>
                                    <div className='form-group '>
                                        <input type='text'
                                               className='form-control'
                                               ref='u_name'
                                               autoFocus
                                               placeholder='输入用户名'
                                               onChange={(e) => this.changeValue(e,'u_name')}/>
                                        <span className='help-block'>
                                                {this.state.u_name_error_text}
                                            </span>
                                    </div>
                                    <div className='form-group '>
                                        <input  type='e-mail'
                                                className='form-control'
                                                ref='email'
                                                autoFocus
                                                placeholder='输入邮箱'
                                                onChange={(e) => this.changeValue(e,'u_email')}/>
                                        <span className='help-block'>
                                                {this.state.u_email_error_text}
                                            </span>
                                    </div>
                                    <div className='form-group '>
                                        <input  type='password'
                                                className='form-control'
                                                ref='psw'
                                                autoFocus
                                                placeholder='输入密码'
                                                onChange={(e) => this.changeValue(e,'u_psw')}/>
                                        <span className='help-block'>
                                                {this.state.u_psw_error_text}
                                        </span>
                                    </div>
                                    <div className='form-group '>
                                        <input  type='password'
                                                className='form-control'
                                                ref='pswagain'
                                                autoFocus
                                                placeholder='确认密码'
                                                onChange={(e) => this.changeValue(e,'psw_again')}/>
                                        <span className='help-block'>
                                                {this.state.psw_again_error_text}
                                        </span>
                                    </div>
                                    <div className='form-group '>
                                        <div className="register-verify-div">
                                            <input  type='text'
                                                    className='form-control register-verify-input'
                                                    ref='u_verify'
                                                    autoFocus
                                                    placeholder='输入验证码'
                                                    onChange={(e) => this.changeValue(e,'u_verify')}/>&nbsp; &nbsp;
                                            <button className="form-control register-verify-span text-center">
                                                <strong>{this.state.verifyNum}</strong>
                                            </button>&nbsp; &nbsp;
                                            <a className="register-verify-a"
                                               onClick={(e) => this.changeVerifyNum(e)}>换一张~</a>
                                        </div>
                                        <span className='help-block'>
                                                {this.state.verify_error_text}
                                        </span>
                                    </div>
                                    <br/>
                                    <button type='submit'
                                            className='btn btn-primary register-login-btn'
                                            disabled={this.state.disabled}
                                            onClick={(e) => this.login(e)}>
                                        注册
                                    </button>
                                    <br/>
                                    <br/>
                                    <Link to='/'>
                                        返回首页
                                    </Link>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
        )
    }
}

Register.propTypes = {
    registerUser: React.PropTypes.func,
    registerStatusText: React.PropTypes.string,
};