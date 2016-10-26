import React from 'react'

import MyData from './myData'

export default class Footer extends React.Component {
    render() {
        return (
            <div>
                <MyData/>
            </div>
        )
    }
}

/*
import React,{Component} from 'react'
import defaultImage from '../../assets/imgs/background.jpg'
import hjlAvatar from '../../assets/imgs/cat.jpg'

export default class PersonalPage extends Component{
    constructor(props){
        super(props)
        this.props = props;
        this.handleClick = this.handleClick.bind(this);
        this.state = {
            isInverse : false
        }
    }

    handleClick(){
        let state = this.state.isInverse;
        this.setState({
            isInverse : !state
        })
    }

    render(){
        var imgFigureClassName = 'img-figure';
        imgFigureClassName += this.state.isInverse ? ' is-inverse' : '';
        return (
            <div>
                <div className="background">
                </div>
                <div className="outer-container">
                    <div className="wrap-container">
                        <div className="content-outer">
                            <div className="content-inner">
                                <div className='about-container'>
                                    <figure className={imgFigureClassName} onClick={this.handleClick}>
                                        <img src={defaultImage}

                                        />
                                        <figcaption>
                                            <div className="img-back" onClick={this.handleClick}>
                                                <div className="personal-header">
                                                    <img src={hjlAvatar} alt="avatar"/>
                                                </div>
                                                <div className="personal-container">
                                                    <div className="personal-context">
                                                        <div className="personal-tag">
                                                            <i className="fa fa-mortar-board"> </i>背景
                                                        </div>
                                                        <div className="personal-content">
                                                            <p>
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="personal-study">
                                                        <div className="personal-tag">
                                                            <i className="fa fa-crosshairs"> </i>技术
                                                        </div>
                                                        <div className="personal-content">
                                                            <p>
                                                                </p>
                                                        </div>
                                                    </div>
                                                    <div className="personal-like">
                                                        <div className="personal-tag">
                                                            <i className="fa fa-heart"> </i>爱好
                                                        </div>
                                                        <div className="personal-content">
                                                            <p>
                                                                </p>
                                                        </div>
                                                    </div>
                                                    <div className="personal-more">
                                                        <div className="personal-tag">
                                                            <i className="fa fa-th-large"> </i>更多
                                                        </div>
                                                        <div className="personal-content">
                                                            <a href="javascript:;">
                                                                <i className="fa fa-github"></i>
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                        </figcaption>
                                    </figure>
                                </div>
                                <div className="footer-container">
                                    <ul>
                                        <li>
                                            <span>@2016 / 京ICP备16040054号</span>
                                        </li>
                                        <li>
                                            <a className="github" href="https://github.com/HUJINLIANG/HJL-Blog-react" target="_block">
                                                <i className="fa fa-github"></i>
                                            </a>
                                        </li>
                                        <li>
                                            <a className="email" href="mailto:1617451312@qq.com" target="_block">
                                                <i className="fa fa-envelope"></i>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}*/