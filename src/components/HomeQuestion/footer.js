// 页尾，纯组件，固定组件
import React from 'react'
import Logo from '../../assets/imgs/logo-footer.png';
import AppPic from '../../assets/imgs/app.png';

export default class Footer extends React.Component{
    render(){
        return (
            <div id="footer" className="mar-t50">
                <div className="jkinfor-block">
                    <div className="jkinfor cf">
                        <div className="jk-logo">
                            <img src={Logo} />
                            <p>实验班问答交流平台</p>
                        </div>
                        <dl> <dt>关于</dt>
                            <dd> <a target="_blank" href="#">这个班级</a> </dd>
                            <dd> <a target="_blank" href="#">这个平台</a> </dd>
                            <dd> <a target="_blank" href="#">开发者们</a> </dd>
                            <dd> <a target="_blank" href="#">帮助中心</a> </dd>
                            <dd> <a target="_blank" href="#">APP下载</a> </dd>
                        </dl>
                        <dl> <dt>技术</dt>
                            <dd> <a target="_blank" href="#">Python</a> </dd>
                            <dd> <a target="_blank" href="#">JavaScript</a> </dd>
                            <dd> <a target="_blank" href="#">Android</a> </dd>
                            <dd> <a target="_blank" href="#">iOS</a> </dd>
                            <dd> <a target="_blank" href="#">还有很多</a> </dd>
                        </dl>
                        <dl> <dt>合作</dt>
                            <dd> <a target="_blank" href="#">联系我们</a> </dd>
                            <dd> <a target="_blank" href="#">加入我们</a> </dd>
                            <dd> <a target="_blank" href="#">已有合作</a> </dd>
                            <dd> <a target="_blank" href="#">给点意见</a> </dd>
                        </dl>
                        <dl> <dt>链接</dt>
                            <dd> <a target="_blank" href="#">Chrome</a> </dd>
                            <dd> <a target="_blank" href="#">百度</a> </dd>
                            <dd> <a target="_blank" href="#">微博</a> </dd>
                            <dd> <a target="_blank" href="#">Github</a> </dd>
                            <dd> <a target="_blank" href="#">Facebook</a> </dd>
                        </dl>
                        <div className="jk-down">
                            <p className="hot-tel">服务热线:暂时未开通，敬请期待</p>
                            <div className="downCon down-ios"> <img src={AppPic} className="twoCode" alt="下载二维码"/> iPhone </div>
                            <div className="downCon down-and"> <img src={AppPic} className="twoCode" alt="下载二维码"/> Android </div>
                        </div>
                    </div>
                </div>
                <div className="w-1000 copyright"> Copyright © 2016&nbsp; <strong>
                    <a href="#" target="_blank">
                        实验班问答交流平台 Experimental Class
                    </a>
                </strong>
                    <a href="" target="_blank" className="down-wechat"> </a>
                    <a href="" target="_blank" className="down-sina"> </a>
                </div>
            </div>
        )
    }
}