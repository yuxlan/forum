// 页尾，纯组件，固定组件
import React from 'react'

export default class Footer extends React.Component{
    render(){
        return (
            <footer>
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
        )

    }
}