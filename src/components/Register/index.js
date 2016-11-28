// 注册表单

import React from 'react';
import {Link} from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../../actions';
import { validateEmail, validateUsername } from '../../utiles/misc';
import {API_ROOT} from '../../config';

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

    registerUser(u_email,u_name,u_psw){
        sessionStorage.setItem('u_psw',u_psw);
        let url = API_ROOT + 'sign_up';
        $.post(url,{u_email:u_email,u_name:u_name,u_psw:u_psw},
            function(data){
                sessionStorage.setItem('u_id',data.u_id);
                console.log('userRegister',data);
                this.getUserInfo(sessionStorage.getItem('u_id'));
            })
    };

    getUerInfo(u_id){
        let url = API_ROOT + 'u/query';
        $.get(url,{u_id:u_id},
            function (data) {
                sessionStorage.setItem('u_name',data.u_name);
                browserHistory.push('/');
            })
    }

    login(e) {
        e.preventDefault();
      //  const {actions} = this.props;
       // actions.registerUser(this.state.u_email, this.state.u_name, this.state.u_psw, this.state.redirectTo);
        this.registerUser(this.state.u_email, this.state.u_name, this.state.u_psw);
    }

    render(){
        return(
        <div>
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
                            this.props.registerStatusText &&
                            <div className="alert alert-info">
                                {
                                    this.props.registerStatusText
                                }
                            </div>
                        }
                        <div className='panel panel-default'>
                            <div className='panel-body'>
                                <form onKeyPress={(e) => this._handleKeyPress(e)}>
                                    <div className='form-group '>
                                        <label className='control-label'>
                                        </label>
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
                                        <label className='control-label'>
                                        </label>
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
                                        <label className='control-label'>
                                        </label>
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
                                        <label className='control-label'>
                                        </label>
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
                                    <br/>
                                    <button type='submit'
                                            className='btn btn-primary'
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
        </div>
        )
    }
}

Register.propTypes = {
    registerUser: React.PropTypes.func,
    registerStatusText: React.PropTypes.string,
};
/*
 import React,{Component} from 'react'
 import {bindActionCreators} from 'redux'
 import {connect} from 'react-redux'
 import {reduxForm} from 'redux-form'
 import * as Actions from '../../actions'
 import SNSLogin from './snsLogin'

 const mapStateToProps = (state) => {
 return {
 sns:state.sns.toJS()
 }
 };

 const mapDispatchToProps = (dispatch) => {
 return {
 actions:bindActionCreators(Actions,dispatch)
 }
 };

 const validate = values => {
 const errors = {};
 if(!values.email){
 errors.email = 'Required';
 }else if((!/^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/.test(values.email))){
 errors.email = '地址无效'
 }

 if(!values.password){
 errors.password = 'Required';
 }

 return errors;
 };

 @connect(mapStateToProps,mapDispatchToProps)
 @reduxForm({
 form:'signin',
 fields:['email','password'],
 validate
 })
 export default class Login extends Component{
 constructor(props){
 super(props);
 this.handleSubmit = this.handleSubmit.bind(this);
 }

 handleSubmit(e){
 e.preventDefault();
 console.log('login');
 const {values} = this.props;
 console.log(values);
 const {actions} = this.props;
 actions.localLogin(values);
 }
 componentDidMount(){
 const {actions,sns} = this.props;
 if(sns.logins.length <1){
 actions.getSnsLogins();
 }

 }

 validatorCalss(field){
 let initClass = 'form-control'
 if(field.invalid){
 initClass += ' ng-invalid'
 }
 if(field.dirty){
 initClass += ' ng-dirty'
 }
 return initClass
 }

 render(){
 const {sns,fields:{email,password},dirty,invalid} = this.props;

 return (
 <div>
 <div className="background">
 </div>
 <div className="outer-container">
 <div className="wrap-container">
 <div className="content-outer">
 <div className="content-inner">
 <div className="signin-box">
 <div className="signin-container">
 <h4 className="title">登 录</h4>
 <form className="signin-form form-horizontal" id="signin" name="signin" onSubmit={this.handleSubmit} noValidate>
 <div className="form-group">
 <div className="input-group">
 <div className="input-group-addon">
 <i className="fa fa-envelope-o"></i>
 </div>
 <input type="email"
 className={ this.validatorCalss(email) }
 placeholder="邮箱"
 {...email} />
 </div>
 </div>
 <div className="form-group">
 <div className="input-group">
 <div className="input-group-addon"><i className="fa fa-unlock-alt"></i></div>
 <input type="password"
 className={ this.validatorCalss(password) }
 placeholder="密码"
 {...password} />
 </div>
 </div>
 <div className="form-group">
 <button disabled={ invalid } className="btn btn-primary btn-lg btn-block" type="submit">登 录</button>
 </div>

 </form>

 <p className="text-center">您还可以通过以下方式直接登录</p>
 <SNSLogin logins={sns.logins}/>
 </div>
 </div>
 </div>
 </div>
 </div>
 </div>
 </div>


 )
 }
 }

 */