//验证邮箱部分
import React from 'react';
import {Link} from 'react-router';

import Footer from '../Home/footer';

class VerifyEmail extends React.Component{
    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e){

    }

    handleSubmit(e){

    }

    render(){
        return(
            <div>
            <div className='container'>
                <div className='row flipInX'>
                    <div className='col-sm-8'>
                        <h3 className="text-center">
                        <br/>
                        <strong>
					       实验班问答交流平台
                        </strong>
                        <br/>
                        <br/>
                        <br/>
					   </h3>
                        <hr/>
                        <br/>
                        <br/>
                        <div className='panel panel-default'>
                            <div className='panel-heading'>
                                验证邮箱
                            </div>
                                <div className='panel-body'>
                                    <form>
                                        <div className='form-group '>
                                            <label className='control-label'>
                                            </label>
                                                <input type='text' 
                                                       className='form-control' 
                                                       ref='mailbox'
                                                       autoFocus 
                                                       placeholder='输入注册的邮箱'/>
                                            <span className='help-block'>
                                            </span>
                                        </div>
                                        <div className='form-group '>
                                            <label className='control-label'>
                                            </label>
                                                <input type='password' 
                                                       className='form-control' 
                                                       ref='code'
                                                       autoFocus 
                                                       placeholder='输入您收到的验证码'/>
                                            <span className='help-block'>
                                            </span>
                                        </div>
                                        <br/>
                                        <br/>
                                        <button type='submit' 
                                                className='btn btn-primary'>
                                            提交
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
            <Footer />
            </div>
        );
    }
}

export default VerifyEmail;