import React,{Component} from 'react';
import {Link,browserHistory } from 'react-router';
import Alert from 'react-s-alert';
import $ from 'jquery';

import {API_ROOT} from '../../config';

export default class UserSafe extends Component{
    constructor(props){
        super(props);
        this.state = {
            key:'',
            u_psw_before:'',
            u_psw:'',
            u_psw_again:'',
            disabled:true,
        }
    }

    componentDidMount(){
        // 获取密钥
        let Surl = API_ROOT + 'safe/secret_key';
        $.get(Surl,
            function (data) {
                this.setState({key:data});
                console.log('key:',this.state.key);
            }.bind(this));
    }

    isDisabled(){
        this.setState({
            disabled:false,
        });
    }

    changeValue(e,type){
        const value = e.target.value;
        const next_state = {};
        next_state[type] = value;
        this.setState(next_state,() => {
            this.isDisabled();
        });
    }

    handleSubmit(e){
        let u_id = sessionStorage.getItem('u_id');
        let u_psw_before = this.state.u_psw_before;
        let u_psw = this.state.u_psw;
        this.changePassword(u_id,u_psw_before,u_psw);
    }

    changePassword(u_id,u_psw_before,u_psw){
        let url=API_ROOT+'u/psw/change';
        $.post(
            url,
            {u_id:u_id,u_psw_before:u_psw_before,u_psw:u_psw,secret_key:this.state.key},
            function (data) {
                if(data.code=1){
                    let content = '修改密码成功，请重新登录';
                    let type = 'success';
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
                    sessionStorage.removeItem('u_id','u_intro','u_tags','u_watchusers','u_answers','u_questions','u_articles','u_github','u_blog','u_name','u_email','u_email_confirm','u_level','u_reputation','u_realname',);
                    browserHistory.push('/login');
                }else {
                    let content = '修改失败';
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
            }
        )
    }

    render(){
        return (
            <div>
                <Alert stack={{limit:1}} position='top-right' timeout={3000}/>
                <br />
                <br />
                <div className="panel admin-panel table-1">
                    <div className="panel-head">
                        <strong><span className="icon-pencil-square-o"> </span> 修改密码 </strong>
                    </div>
                    <br />
                    <br />
                    <div className="body-content">
                        <form className="form-x">
                            <div className="form-group">
                                <div className="label">
                                    <label>原始密码：</label>
                                </div>
                                <div className="field">
                                    <input type="password"
                                           className="input"
                                           ref="u_psw_before"
                                           onChange={(e) => this.changeValue(e,'u_psw_before')}/>
                                    <div className="tips"></div>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="label">
                                    <label>新密码：</label>
                                </div>
                                <div className="field">
                                    <input type="password"
                                           className="input"
                                           ref="u_psw"
                                           onChange={(e) => this.changeValue(e,'u_psw')}/>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="label">
                                    <label>确认新密码：</label>
                                </div>
                                <div className="field">
                                    <input type="password" className="input" ref="u_psw_again"
                                           onChange={(e) => this.changeValue(e,'u_psw_again')}/>
                                    <div className="tips"></div>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="label">
                                    <label> </label>
                                </div>
                                <div className="field">
                                    <button className="button bg-main icon-check-square-o"
                                            type="submit"
                                            onClick={(e)=>this.handleSubmit(e)}>
                                        确认修改</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}
