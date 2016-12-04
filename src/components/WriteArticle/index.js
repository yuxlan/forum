import React from 'react';
import ReactDOM from 'react-dom';
import '../../stylesheets/writePage.less'
import markIt from'./marked'
import Controller from './controller';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as actions from '../../actions'
import {parseArticle} from '../../utiles'
import $ from 'jquery'
import {API_ROOT} from '../../config'
import Nav from '../HomeArticle/navbar';
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
            text:'',
            tags:[],
            downloadURL:'',
            startPoint:0,
            endPoint:0,
            text_title:'',
            output:''
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
        const {adminTagList,actions} = this.props;
        if(adminTagList.items.length <1){
            actions.getAdminTagList();
        }
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

    changeValue(e,type){
        const value = e.target.value;
        const next_state = {};
        next_state[type] = value;
    }

    uploadFile(e){
        const {actions} = this.props;
        var formData = new FormData($("#uploadForm")[0]);
        let user_id = sessionStorage.getItem('u_id');
        let user_psw = sessionStorage.getItem('u_psw');
        let url = API_ROOT + 't/add';

        $.post(
            url, {u_id:user_id,u_psw:user_psw,u_title:this.state.text_title,u_text:this.state.output},
            function(data){
                if(1 === data.code) {
                    let content = '上传文章成功';
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

    render(){
        let {insert,changeData,downloadURL,clearAll,save,adminTagList} = this.props;
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
                           onChange={(e) => this.changeValue(e,'text_title')}/>
                    <div className="pull-right">
                        <button className="btn btn-danger controller-item" onClick={(e)=>this.clearAll(e)}><i className="glyphicon glyphicon-trash"> </i>清空文本</button>&nbsp; &nbsp;
                        <a className="btn btn-default" href={downloadURL} download="README.md" onMouseEnter={changeData}><i className="icon1-markdown"> </i>导出md</a>&nbsp; &nbsp;
                        <button className="btn btn-success controller-item" onClick={(e)=>this.uploadFile(e)}><i className="fa fa-save"> </i>发布博客</button>
                        <a>&nbsp; &nbsp; &nbsp;</a>
                    </div>
                    </form>
                </div>
                <div id="app">
                    <div className="container-fluid">
                        <Controller insert={this.tag} save={this.save} changeData={this.changeData} downloadURL={this.state.downloadURL} clearAll={this.clearAll} />
                        <div className="row work-container">
                            <div className={class1}>
                                <div className="page editor">
                                    <textarea ref="input" id="marking" value={this.state.text} onChange={this.changeValue}> </textarea>
                                </div>
                            </div>
                            <div className={class2}>
                                <div className="page">
                                    <div id="markdown-content" className="markdown-content" ref="output" dangerouslySetInnerHTML={{__html: markIt(this.state.text)}}
                                         onChange={(e) => this.changeValue(e,'output')}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}