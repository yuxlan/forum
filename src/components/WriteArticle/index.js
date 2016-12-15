import React from 'react';
import {Link,browserHistory } from 'react-router';
import '../../stylesheets/writePage.less'
import markIt from'./marked'
import Controller from './controller';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as actions from '../../actions'
import {parseArticle} from '../../utiles'
import $ from 'jquery'
import {API_ROOT} from '../../config'
import Nav from '../HomeArticleHot/navbar';
import Alert from 'react-s-alert';

const mapStateToProps = (state) => {
    return {
        adminTagList:state.adminTagList.toJS()
    }
};

const mapDispatchToProps = dispatch => {
    return {
        actions :bindActionCreators(actions,dispatch)
    }
};

@connect(mapStateToProps,mapDispatchToProps)
export default class WriteArticle extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            key:'',
            text:'',
            tags:[],
            downloadURL:'',
            startPoint:0,
            endPoint:0,
            text_title:'',
            text_tags:'',
            output:'',
            disabled:true,
        }
        this.changeValue = this.changeValue.bind(this);
        this.tag = this.tag.bind(this);
        this.changeData = this.changeData.bind(this);
        this.clearAll = this.clearAll.bind(this);
        this.save = this.save.bind(this);
        this.selectTag = this.selectTag.bind(this);
        this.uploadFile = this.uploadFile.bind(this)
    }

    componentDidMount(){
    //    const {adminTagList,actions} = this.props;
    //    if(adminTagList.items.length <1){
    //        actions.getAdminTagList();
    //    }
        // 获取密钥
        let Surl = API_ROOT + 'safe/secret_key';
        $.get(Surl,
            function (data) {
                this.setState({key:data});
                console.log('key:',this.state.key);
            }.bind(this));
    }

    tag(item){
        return function(){

            var myField = this.refs.input;
            var startPoint;
            var endPoint;
            var text = this.state.text;
            var newText = text;

            if (document.selection) {
                myField.focus()
                sel = document.selection.createRange()
                sel.text = item
                sel.select()
            }
            else if (myField.selectionStart || myField.selectionStart == '0') {
                var startPos = myField.selectionStart
                var endPos = myField.selectionEnd

                var restoreTop = myField.scrollTop
                newText = text.substring(0, startPos) + item + text.substring(endPos,text.length)
                if (restoreTop > 0) {

                    myField.scrollTop = restoreTop
                }
                myField.focus()
                startPoint = startPos + item.length
                endPoint = startPos + item.length
            } else {
                newText += item
                myField.focus()
            }


            this.setState({
                text:newText,
                startPoint:startPoint,
                endPoint:endPoint
            });

        }.bind(this)
    }
    componentDidUpdate(prevProps,prevState){
        console.log('update');
        if(this.state.startPoint != prevState.startPoint)
        {
            this.refs.input.selectionStart = this.state.startPoint;
            this.refs.input.selectionEnd = this.state.endPoint;
            this.refs.input.focus();
        }

    }
    changeData(){
        var value = this.state.text;
        var blob = new Blob([value]);
        var objURL = URL.createObjectURL(blob);
        this.setState({
            downloadURL:objURL
        })
    }
    clearAll(e){
        this.setState({
            text:''
        })
    }

    save(){
        let article = this.state.text;
        let data = parseArticle(article);
        if(this.state.tags.length){
            data.tags = this.state.tags
        }
        console.log(data)
        const {actions} = this.props;
        actions.addArticle(data)

    }

    selectTag(e,tid){
        if(e.target.className.indexOf('active') == -1){
            e.target.className += ' active';
            let tags = this.state.tags;
            tags.push(tid);
            this.setState({
                tags:tags
            })
        }else{
            e.target.className = 'tag-item';
            let tags = this.state.tags;
            tags.splice(tags.indexOf(tid),1);
            this.setState({
                tags:tags
            })
        }
    }

    changeValue(e){
        this.setState({text:e.target.value});
    }

    isDisabled(){
        this.setState({
            disabled:false,
        });
    }

    changePostValue(e,type){
        const value = e.target.value;
        const next_state = {};
        next_state[type] = value;
        this.setState(next_state,() => {
            this.isDisabled();
        });
    }

    addArticles(u_id,u_psw,u_title,u_text,t_tags){
        let url = API_ROOT + 't/add';
        let userUrl = API_ROOT + 'u/query';
        let user_id = sessionStorage.getItem('u_id');
        $.post(
            url, {u_id:u_id,u_psw:u_psw,t_title:u_title,t_text:u_text,t_tags:t_tags,secret_key:this.state.key},
            function(data){
                console.log('add articles:',data);
                if(data.code == 1) {
                    $.get(userUrl, {u_id: u_id},
                        function (data) {
                            console.log('getUserInfo:', data);
                            if (data.code == 1) {
                                sessionStorage.removeItem('u_articles');
                                sessionStorage.setItem('u_articles', data.u_articles);
                                let content = '上传文章成功';
                                let type = 'success';
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
                                browserHistory.push('/personalpage/articles');
                            } else {
                                let content = '上传文章失败';
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
                } else {
                    let content = '上传文章失败';
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

    uploadFile(e){
        e.preventDefault();

        let user_id = sessionStorage.getItem('u_id');
        let user_psw = sessionStorage.getItem('u_psw');
        let article = this.state.text;
        let t_tags = this.state.text_tags;
        console.log('article title:',this.state.text_title,'article content:',article);
        this.addArticles(user_id,user_psw,this.state.text_title,article,t_tags);

    }

    render(){
        let {insert,changeData,downloadURL,clearAll,save,adminTagList,tagList} = this.props;
        console.log(this.state.tags);
        var class1,class2;
        class1 = "col-xs-6";
        class2 = "col-xs-6";
        return (
            <div style={{height:'100%'}} className="background-color">
                <Alert stack={{limit:1}} position='top-right' timeout={3000}/>
                <Nav/>
                <hr/>
                <div className="background-admin">
                    <form>
                    <input className="markdown-input" placeholder="输入文章标题" ref='text_title'
                           onChange={(e) => this.changePostValue(e,'text_title')}/>
                        <hr className="markdown-hr"/>
                        <input className="markdown-input-1" placeholder="输入标签，以‘，’相隔，例：JavaScript，数据库" ref='text_tags'
                               onChange={(e) => this.changePostValue(e,'text_tags')}/>
                    <div className="pull-right">
                        <a className="btn btn-default" href={downloadURL} download="README.md" onMouseEnter={changeData}><i className="icon1-markdown"> </i>导出md</a>&nbsp; &nbsp;
                        <button className="btn btn-info controller-item" onClick={(e)=>this.uploadFile(e)}><i className="fa fa-save"> </i>发布博客</button>
                        <a>&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;</a>
                    </div>
                    </form>
                </div>
                <div id="app">
                    <div className="container-fluid">
                        <Controller insert={this.tag} save={this.save} changeData={this.changeData} downloadURL={this.state.downloadURL} clearAll={(e)=>this.clearAll(e)} />
                        <div className="row work-container">
                            <div className={class1}>
                                <div className="page-1 editor">
                                    <textarea ref="input" id="marking" value={this.state.text} onChange={this.changeValue}> </textarea>
                                </div>
                            </div>
                            <div className={class2}>
                                <div className="page-1">
                                    <div id="markdown-content" ref="output" dangerouslySetInnerHTML={{__html: markIt(this.state.text)}}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}