/*注册表单*/
import React from 'react';
import {Link} from 'react-router';

export default class Register extends React.Component {
    render(){
        return(
            <div className="register">
                <div className='container'>
                    <div className='row flipInX animated'>
                        <div className='register-title-color'>
                            <br/>
                            <br/>
                            <h3><strong>欢迎成为平台用户</strong></h3>
                            <h4><strong>想了解此平台？</strong></h4>
                            <a href='#' className='register-title-link'>请看这里</a>
                            <br/>
                            <br/>
                        </div>
                        <div className='col-sm-8-1'>
                            <div className='panel panel-default'>
                                <div className='panel-body'>
                                    <form>
                                        <div className='form-group '>
                                            <label className='control-label'>
                                            </label>
                                            <input type='text'
                                                   className='form-control'
                                                   ref='name'
                                                   autoFocus
                                                   placeholder='输入用户名'/>
                                            <span className='help-block'>
                                            </span>
                                        </div>
                                        <div className='form-group '>
                                            <label className='control-label'>
                                            </label>
                                            <input  type='e-mail'
                                                    className='form-control'
                                                    ref='email'
                                                    autoFocus
                                                    placeholder='输入邮箱'/>
                                            <span className='help-block'>
                                            </span>
                                        </div>
                                        <div className='form-group '>
                                            <label className='control-label'>
                                            </label>
                                            <input  type='password'
                                                    className='form-control'
                                                    ref='psw'
                                                    autoFocus
                                                    placeholder='输入密码'/>
                                            <span className='help-block'>
                                            </span>
                                        </div>
                                        <div className='form-group '>
                                            <label className='control-label'>
                                            </label>
                                            <input  type='password'
                                                    className='form-control'
                                                    ref='pswagain'
                                                    autoFocus
                                                    placeholder='确认密码'/>
                                            <span className='help-block'>
                                            </span>
                                        </div>
                                        <br/>
                                        <button type='submit'
                                                className='btn btn-primary'>
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
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                </div>
            </div>
        )
    }
}
