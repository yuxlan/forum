// 页头导航

import React from 'react'
import {Link} from 'react-router'
import {Dropdown} from 'react-bootstrap'


export default class Navbar extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isDown:true
        };

        this.handleScroll = this.handleScroll.bind(this);
    }
    componentDidMount(){
        window.addEventListener('scroll',this.handleScroll)
    }
    handleScroll(){
        if(window.scrollY > 50){
            this.setState({
                isDown:false
            })
        }else{
            this.setState({
                isDown:true
            })
        }
    }

    render(){
        const {location,auth,logout} = this.props;
        console.log(auth)
        return (
            <div>
                <nav className="fixed">
                    <div className="container-fluid">
                        <div className="row-fluid">
                            <ul className="nav nav-tabs">
                                <li className="active">
                                    <Link to='/'>
                                        <strong>首页</strong>
                                    </Link>
                                </li>
                                <li>
                                    <Link to='/'>
                                        <strong>文章</strong>
                                    </Link>
                                </li>
                                <li className="disabled">
                                    <Link to='/'>
                                        <strong>问答</strong>
                                    </Link>
                                </li>
                                <li>
                                    <form   ref='searchForm'
                                            className='navbar-form navbar-left animated' >
                                        <div className='input-group'>
                                            <input  type='text'
                                                    className='form-control' />
                                            <span className='input-group-btn'>
                                                    <button className='btn btn-default'>
                                                        <span className='glyphicon glyphicon-search'>
                                                        </span>
                                                    </button>
                                                </span>
                                        </div>
                                    </form>
                                </li>
                                {auth.token && auth.user && auth.user.role === 'admin' &&
                                <li><Link  activeClassName="active" title="admin" to="/admin">
                                    <i className="fa fa-envira"> </i>管理
                                </Link></li>
                                }
                                {(auth.token && auth.user)?
                                    (
                                        <li className="dropdown pull-right">
                                            <a  href="#"
                                                data-toggle="dropdown"
                                                className="dropdown-toggle">
                                                个人中心
                                                <strong className="caret"></strong>
                                            </a>
                                            <ul className="dropdown-menu">
                                                <li>
                                                    <a  href="#">我的资料</a>
                                                </li>
                                                <li className="divider">
                                                </li>
                                                <li>
                                                    <a  href="#">我的声望</a>
                                                </li>
                                                <li>
                                                    <a  href="#">我的关注</a>
                                                </li>
                                                <li>
                                                    <a href="#">我的问答</a>
                                                </li>
                                                <li>
                                                    <a  href="#">我的文章</a>
                                                </li>
                                                <li className="divider">
                                                </li>
                                                <li>
                                                    <a href="#" onClick={logout}>
                                                        退出
                                                    </a>
                                                </li>
                                            </ul>
                                        </li>
                                    )
                                    :
                                    <li className="pull-right">
                                        <Link to="/login" activeClassName="active">
                                            <i className="fa fa-sign-in"> </i>登录|注册
                                        </Link>
                                    </li>
                                }
                                {auth.token && auth.user&&
                                <li ><Link to="/setting" title={auth.user.nickname}>
                                    <img src={auth.user.avatar || defaultAvatar} className="user-avatar"/>
                                </Link></li>}

                            </ul>
                        </div>
                    </div>
                </nav>
                <br/><br/>
                <div className="title-bg">
                    <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
                    <div>
                        <div className="span12">
                            <div className="carousel slide" id="carousel-859843">
                                <ol className="carousel-indicators">
                                    <li className="active" data-slide-to="0" data-target="#carousel-859843">
                                    </li>
                                    <li data-slide-to="1" data-target="#carousel-859843">
                                    </li>
                                    <li data-slide-to="2" data-target="#carousel-859843">
                                    </li>
                                </ol>
                                <div className="carousel-inner">
                                    <div className="item active">
                                        <h3 className="text-center">
                                            <strong>公告</strong>
                                        </h3>
                                        <br />
                                        <p className="text-center">
                                            这里是公告这里是公告呀~~~~~
                                        </p>
                                    </div>
                                    <div className="item">
                                        <h3 className="text-center">
                                            <strong>公告</strong>
                                        </h3>
                                        <br />
                                        <p className="text-center">
                                            这里是公告这里是公告呀~~~~~
                                        </p>
                                    </div>
                                    <div className="item">
                                        <h3 className="text-center">
                                            <strong>公告</strong>
                                        </h3>
                                        <br />
                                        <p className="text-center">
                                            这里是公告这里是公告呀~~~~~
                                        </p>
                                    </div>
                                </div>
                                <a data-slide="prev" href="#carousel-859843" className="left carousel-control">‹</a>
                                <a data-slide="next" href="#carousel-859843" className="right carousel-control">›</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}