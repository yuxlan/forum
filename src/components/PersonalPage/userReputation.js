import React from 'react'
import {Link,browserHistory} from 'react-router';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import $ from 'jquery';
import Alert from 'react-s-alert';

import {API_ROOT} from '../../utiles';
import {customTime,formatDate} from '../../utiles';
import * as Actions from '../../actions'

const mapStateToProps =  (state) => {
    return {
     //   auth:state.auth.toJS(),
     //   adminQueryReputation:state.adminQueryReputation.toJS(),
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
     //   actions:bindActionCreators(Actions,dispatch)
    }
};

@connect(mapStateToProps,mapDispatchToProps)
export default class userReputation extends React.Component{
    constructor(props){
        super(props);
        this.state={
            key:'',
            reputationHistory:[],
        }
    }

    componentDidMount(){
        // 获取密钥
        let url = API_ROOT + 'safe/secret_key';
        $.get(url,
            function (data) {
                this.setState({key:data});
                console.log('key:',this.state.key);
            }.bind(this));

        let u_id = sessionStorage.getItem('u_id');
        let u_psw = sessionStorage.getItem('u_psw');
        this.queryReputationHistory(u_id,u_psw)
    }

    // 查询声望记录
    queryReputationHistory(u_id,u_psw){
        let url = API_ROOT + 'u/rep/history';
        $.post(url,{u_id:u_id,u_psw:u_psw,secret_key:this.state.key},
            function (data) {
                console.log('user reputation history change:',data);
                if(data.code == 1){
                    let content = '用户声望已更新';
                    let type = 'info';
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
                    this.setState({reputationHistory:data});
                } else {
                    let content = '获取声望信息失败，请重试';
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
            }.bind(this))
    }

    render(){

        return (
            <div className="style_16">
                <Alert stack={{limit:1}} position='top-right' timeout={3000}/>
                <br />
                <br />
                <div className="panel admin-panel">
                    <div className="panel-head">
                        <strong className="icon-reorder"> 历史声望记录</strong>
                    </div>
                    <table className="table table-hover text-center">
                        <tr className="text-center">
                            <th width="5%" className="text-center">&nbsp;序号</th>
                            <th width="9%" className="text-center">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;声望值</th>
                            <th width="13%" className="text-center">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;操作</th>
                            <th width="13%" className="text-center">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;更新日期</th>
                        </tr>
                        {
                            this.state.reputationHistory.map((reputation,i) => {
                                return(
                                    <tr key={i}>
                                        <td>{i+1}</td>
                                        <td>{reputation.rep}</td>
                                        <td>{reputation.action}</td>
                                        <td>{formatDate(reputation.date)}</td>
                                    </tr>
                                )
                            })
                        }
                    </table>
                </div>
                <br /><br /><br /><br /><br /><br /><br /><br />
            </div>
        )
    }
}