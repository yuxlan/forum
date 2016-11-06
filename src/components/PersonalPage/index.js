import React from 'react'
import {Link} from 'react-router'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as Actions from '../../actions'

const mapStateToProps =  (state) => {
    return {
        
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions:bindActionCreators(Actions,dispatch)
    }
};

@connect(mapStateToProps,mapDispatchToProps)
export default class Admin extends React.Component{
    constructor(props){
        super(props);
    }
    
    render(){
        const {children} = this.props;
        return (
            <div>
                <div className="background-admin">
                </div>
                <div className="container-fluid admin-container">
                    <div className="row">
                        <div className="admin-controller col-sm-2">
                            <div className="controller-title">个人中心</div>
                            <div className="controller-menu">
                                <div className="fix"></div>
                                <Link className="controller-item" activeClassName="active" title="" to="/personalpage/users">
                                    <i className="fa fa-user"></i>个人设置
                                </Link>
                                <div className="fix"></div>
                                <Link className="controller-item" activeClassName="active" title="" to="/personalpage/tags">
                                    <i className="fa fa-tags"></i>标签管理
                                </Link>
                                <div className="fix"></div>
                                <Link className="controller-item" activeClassName="active" title="" to="/personalpage/articles">
                                    <i className="fa fa-file"></i>我的文章
                                </Link>
                                <div className="fix"></div>
                                <Link className="controller-item" activeClassName="active" title="" to="/personalpage/comments">
                                    <i className="fa fa-comments"></i>我的评论
                                </Link>
                                <div className="fix"></div>
                                <Link className="controller-item" title="" to="/personalpage">
                                    <i className="iconfont">&#xe64a;</i>我的问答
                                </Link>
                                <div className="fix"></div>
                                <Link className="controller-item" title="" to="/personalpage">
                                    <i className="iconfont">&#xe644;</i>我的关注
                                </Link>
                                <div className="fix"></div>
                                <Link className="controller-item" title="" to="/personalpage">
                                    <i className="iconfont">&#xe62d;</i>我的声望
                                </Link>
                                <div className="fix"></div>
                                <Link className="controller-item" title="" to="/personalpage">
                                    <i className="iconfont">&#xe648;</i>安全中心
                                </Link>
                                <div className="fix"></div>
                                <Link className="controller-item" title="" to="/personalpage">
                                    <i className="iconfont">&#xe60c;</i>联系客服
                                </Link>
                                <div className="fix"></div>
                                <Link className="controller-item" to="/">
                                    <i className="iconfont">&#xe632;</i>返回首页
                                </Link>
                                <div className="fix"></div>
                                <br/>
                            </div>
                        </div>
                        {children}
                    </div>
                </div>
                <footer className="personal-footer">
                <hr/>
                <br />
                <div className='container'>
                    <div className="c1">
                        <h3 className='lead'>
                            <strong>关于</strong>
                        </h3>
                        <br />
                        <a>这个班级</a>
                        <br />
                        <a>这个平台</a>
                        <br />
                        <a>开发者们</a>
                        <br />
                        <a>帮助中心</a>
                        <br />
                        <a>APP下载</a>
                        <br />
                        <br />
                        <br />
                    </div>
                    <div className="c2">
                        <h3 className='lead'>
                            <strong>技术</strong>
                        </h3>
                        <br />
                        <a>Python</a>
                        <br />
                        <a>Node</a>
                        <br />
                        <a>JavaScript</a>
                        <br />
                        <a>React</a>
                        <br />
                        <a>HTML</a>
                        <br />
                        <a>Bootstrap</a>
                        <br />
                        <a>Android</a>
                        <br />
                        <a>iOS</a>
                        <br />
                        <a>还有很多</a>
                        <br />
                        <br />
                        <br />
                    </div>
                    <div className="c3">
                        <h3 className='lead'>
                            <strong>合作</strong>
                        </h3>
                        <br />
                        <a>联系我们</a>
                        <br />
                        <a>加入我们</a>
                        <br />
                        <a>已有合作</a>
                        <br />
                        <a>给点意见</a>
                        <br />
                        <br />
                        <br />
                    </div>
                    <div className="c4">
                        <h3 className='lead'>
                            <strong>链接</strong>
                        </h3>
                        <br />
                        <a>Markdown</a>
                        <br />
                        <a>Chrome</a>
                        <br />
                        <a>百度</a>
                        <br />
                        <a>微博</a>
                        <br />
                        <a>Github</a>
                        <br />
                        <a>Twitter</a>
                        <br />
                        <a>Facebook</a>
                        <br />
                        <br />
                        <br />
                    </div>
                    <p>© 2016 实验班</p>
                </div>
            </footer>
            </div>

        )
    }
}