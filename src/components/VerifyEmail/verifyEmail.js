//验证邮箱部分
import React from 'react';
import {Link} from 'react-router';

import Footer from '../Home/footer';
import { validateEmail } from '../../utiles/misc';

class VerifyEmail extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            key:'',
            u_email:'',
            u_verify:'',
            u_email_error_text: null,
            verify_error_text: null,
            disabled: true,
        }
    }

    isDisabled() {
        let u_email_is_valid = false;
        let verify_is_valid = false;

        if(this.state.u_email === ''){
            this.setState({
                u_email_error_text: '对不起，请输入您的注册邮箱',
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

        if(this.state.u_verify === ''){
            this.setState({
                verify_error_text:'请输入您收到的验证码',
            });
        }
        else {
            verify_is_valid = true;
            this.setState({verify_error_text:null});
        }

        if(u_email_is_valid && verify_is_valid) {
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

    verifyEmail(){

    }

    handleSubmit(e){
        e.preventDefault();
        this.verifyEmail();
    }

    render(){
        return(
            <div className="hintemail-bg">
            <div className='container'>
                <div className='row flipInX'>
                    <div className='col-sm-8'>
                        <h3 className="text-center">
                            <br/>
                            <br/>
                            <br/>
                            <br/>
                        <strong>
					       实验班问答交流平台
                        </strong>
					   </h3>
                        <hr/>
                        <br/>
                        <div className='panel panel-default'>
                            <div className='panel-heading'>
                                验证邮箱
                            </div>
                                <div className='panel-body'>
                                    <form onKeyPress={(e) => this._handleKeyPress(e)}>
                                        <div className='form-group '>
                                                <input type='text' 
                                                       className='form-control' 
                                                       ref='mailbox'
                                                       autoFocus 
                                                       placeholder='输入注册的邮箱'
                                                       onChange={(e) => this.changeValue(e,'mailbox')}/>
                                            <span className='help-block'>
                                                    {this.state.u_email_error_text}
                                            </span>
                                        </div>
                                        <div className='form-group '>
                                                <input type='password' 
                                                       className='form-control' 
                                                       ref='code'
                                                       autoFocus 
                                                       placeholder='输入您收到的验证码'
                                                       onChange={(e) => this.changeValue(e,'code')}/>
                                            <span className='help-block'>
                                                    {this.state.verify_error_text}
                                            </span>
                                        </div>
                                        <button type='submit' 
                                                className='btn btn-primary  register-login-btn'
                                                disabled={this.state.disabled}
                                                onClick={(e) => this.handleSubmit(e)}>
                                            提交
                                        </button>
                                        <br/>
                                        <br/>
                                        <Link to='/'>
                                            <a className="pull-right"> 跳过 >>> &nbsp; &nbsp;</a>
                                        </Link>
                                    </form>
                                </div>
                            </div>
                    </div>
                </div>
            </div>
            <Footer />
            </div>
        );
    }
}

export default VerifyEmail;