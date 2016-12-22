import React,{Component} from 'react';
import {Link,browserHistory } from 'react-router';
import Alert from 'react-s-alert';
import $ from 'jquery';

import {API_ROOT} from '../../config';

export default class UserSetting extends Component{
    constructor(props){
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.updateUserInfo = this.updateUserInfo.bind(this);
        this.changeRealName = this.changeRealName.bind(this);
        this.changeBlog = this.changeBlog.bind(this);
        this.changeGithub = this.changeGithub.bind(this);
        this.changeIntro = this.changeIntro.bind(this);
        this.state = {
            key:'',
            userrealname:sessionStorage.getItem('u_realname'),
            userblog:sessionStorage.getItem('u_blog'),
            usergithub:sessionStorage.getItem('u_github'),
            userintro:sessionStorage.getItem('u_intro'),
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

    updateUserInfo(u_id,u_psw,u_realname,u_blog,u_github,u_intro){
        let url = API_ROOT + 'u/update';
        let userurl = API_ROOT + 'u/query';
        $.post(url,
            {u_id:u_id,u_psw:u_psw,u_realname:u_realname,u_blog:u_blog,u_github:u_github,u_intro:u_intro,secret_key:this.state.key},
            function(data){
                console.log('upDateUserInfo:',data);
                if(data.code == 1){
                    let content = '更新用户信息成功';
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
                    sessionStorage.removeItem('u_realname');
                    sessionStorage.removeItem('u_blog');
                    sessionStorage.removeItem('u_github');
                    sessionStorage.removeItem('u_intro');
                    $.get(userurl,{u_id:u_id},
                        function (data) {
                            console.log('get new user info:',data);
                            if(data.code == 1){
                                sessionStorage.setItem('u_realname',data.u_realname);
                                sessionStorage.setItem('u_blog',data.u_blog);
                                sessionStorage.setItem('u_github',data.u_github);
                                sessionStorage.setItem('u_intro',data.u_intro);
                                browserHistory.push('/personalpage');
                            }
                        })
                }
                else{
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
            });
        //const {values,actions} = this.props;
       //console.log(values);
      //actions.updateUser(values);
    }

    handleSubmit(e){
        e.preventDefault();

        let user_id = sessionStorage.getItem('u_id');
        let user_psw = sessionStorage.getItem('u_psw');
        let user_realname = this.state.userrealname;
        let user_blog = this.state.userblog;
        let user_github = this.state.usergithub;
        let user_intro = this.state.userintro;

        console.log('userId:',user_id,'userPsw:',user_psw,'userRealName:',user_realname,'userBlog:',user_blog,'userGithub:',user_github,'userIntro:',user_intro);
        this.updateUserInfo(user_id,user_psw,user_realname,user_blog,user_github,user_intro);
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

    changeIntro(e){
        this.setState({userintro:e.target.value})
    }
    changeGithub(e){
        this.setState({usergithub:e.target.value})
    }
    changeBlog(e){
        this.setState({userblog:e.target.value})
    }
    changeRealName(e){
        this.setState({userrealname:e.target.value})
    }

    render(){
        return (
            <div>
                <Alert stack={{limit:1}} position='top-right' timeout={3000}/>
                <br />
                <br />
            <div className="panel admin-panel table-1">
                <div className="panel-head">
                    <strong><span className="icon-pencil-square-o"> </span> 更改用户信息 </strong>
                </div>
                <br />
                <br />
                <div className="body-content">
                    <form className="form-x">
                        <div className="form-group">
                            <div className="label">
                                <label>真实姓名：</label>
                            </div>
                            <div className="field">
                                <input type="text"
                                       value={this.state.userrealname}
                                       className="input"
                                       ref="userrealname"
                                       placeholder={sessionStorage.getItem('u_realname')}
                                       onChange={this.changeRealName}/>
                                <div className="tips"></div>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="label">
                                <label>博客地址：</label>
                            </div>
                            <div className="field">
                                <input type="text"
                                       value={this.state.userblog}
                                       className="input"
                                       ref="userblog"
                                       placeholder={sessionStorage.getItem('u_blog')}
                                       onChange={this.changeBlog}/>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="label">
                                <label>GitHub地址：</label>
                            </div>
                            <div className="field">
                                <input type="text"
                                       value={this.state.usergithub}
                                       className="input"
                                       ref="usergithub"
                                       placeholder={sessionStorage.getItem('u_github')}
                                       onChange={this.changeGithub}/>
                                <div className="tips"></div>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="label textarea">
                                <label>自我介绍：</label>
                            </div>
                            <div className="field">
                                <textarea className="input"
                                          value={this.state.userintro}
                                          ref="userintro"
                                          placeholder={sessionStorage.getItem('u_intro')}
                                          onChange={this.changeIntro}> </textarea>
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
                                        onClick={(e) => this.handleSubmit(e)}> 提交</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            </div>
        )
    }
}
