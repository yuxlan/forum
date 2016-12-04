// 登录

import React from 'react';
import {bindActionCreators} from 'redux';
import * as Actions from '../../actions';
import {connect} from 'react-redux';
import {Link,browserHistory } from 'react-router';
import $ from 'jquery';
import {API_ROOT} from '../../config';
import Alert from 'react-s-alert';

import * as actionCreators from '../../actions/auth';
// import SNSLogin from './snsLogin'; // 第三方登录，后期可加   <SNSLogin logins={sns.logins}/>

function mapStateToProps(state) {
    return{
        isAuthenticating: state.auth.isAuthenticating,
        statusText: state.auth.statusText,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions:bindActionCreators(Actions,dispatch)
    }
}

@connect(mapStateToProps,mapDispatchToProps)
export default class Login extends React.Component{
    constructor(props){
        super(props);
        const redirectRoute = '/';
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

    loginUser(u_loginname,u_psw) {
        let url = API_ROOT + 'sign_in';
        sessionStorage.setItem('u_psw',u_psw);
        $.post(url,{u_loginname:u_loginname,u_psw:u_psw},
            function(data){
                console.log('userLogin',data);
                if(data.code == 1) {
                     sessionStorage.setItem('u_id',data.u_id);
                     sessionStorage.setItem('u_name',data.u_name);
                     sessionStorage.setItem('u_email',data.u_email);
                     sessionStorage.setItem('u_email_confirm',data.u_email_confirm);
                     sessionStorage.setItem('u_level',data.u_level);
                     sessionStorage.setItem('u_reputation',data.u_reputation);
                     sessionStorage.setItem('u_realname',data.u_realname);
                     sessionStorage.setItem('u_blog',data.u_blog);
                     sessionStorage.setItem('u_github',data.u_github);
                     sessionStorage.setItem('u_articles',data.u_articles);
                     sessionStorage.setItem('u_questions',data.u_questions);
                     sessionStorage.setItem('u_answers',data.u_answers);
                     sessionStorage.setItem('u_watchusers',data.u_watchusers);
                     sessionStorage.setItem('u_tags',data.u_tags);
                     sessionStorage.setItem('u_intro',data.u_intro);
                     browserHistory.push('/');
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
        }})
    }

    login(e) {
        e.preventDefault();
       // const {actions} = this.props;
       // actions.loginUser(this.state.u_loginname,this.state.u_psw, this.state.redirectTo);
        this.loginUser(this.state.u_loginname,this.state.u_psw);
    }

    render(){
        return (
            <div>
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
                            <h4 className="text-center"><strong>欢迎回来</strong></h4>
                            <br />
                            {
                                this.props.statusText &&
                                <div className="alert alert-info">
                                    {this.props.statusText}
                                </div>
                            }
                            <div className='panel panel-default'>
                                <div className='panel-body'>
                                    <form   onKeyPress={(e) => this._handleKeyPress(e)}>
                                        <div className='form-group '>
                                            <label className='control-label label-font'>
                                            </label>
                                            <input type="text"
                                                   className='form-control'
                                                   ref="u_loginname"
                                                   placeholder='输入用户名或邮箱'
                                                   onChange={(e) => this.changeValue(e,'u_loginname')}/>
                                            <span className='help-block'>
                                                    {this.state.u_loginname_error_text}
                                            </span>
                                        </div>
                                        <div className='form-group '>
                                            <label className='control-label label-font'>
                                            </label>
                                            <input type="password"
                                                   className='form-control'
                                                   ref="u_psw"
                                                   placeholder='输入密码'
                                                   onChange={(e) => this.changeValue(e,'u_psw')}/>
                                            <span className='help-block'>
                                                    {this.state.u_psw_error_text}
                                            </span>
                                        </div>
                                        <div className="form-group">
                                            <button className="btn btn-primary"
                                                    type="submit"
                                                    disabled={this.state.disabled}
                                                    onClick={(e) => this.login(e)}>
                                                登 录
                                            </button>
                                        </div>
                                        <br/>
                                        <Link to='/'>
                                            返回首页
                                        </Link>
                                        <br/>
                                        <br/>
                                        <Link to='/register' className="link-font">
                                            新用户吗？请先前往注册 >>
                                        </Link>
                                    </form>
                                    <hr/>
                                    <p className="text-center">您还可以通过以下方式直接登录</p>
                                    <hr />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

Login.propTypes ={
    loginUser: React.PropTypes.func,
    statusText: React.PropTypes.string,
};