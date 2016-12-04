import React from 'react';

import JC from '../../assets/imgs/jiacu.png';
import XT from '../../assets/imgs/xieti.png';
import LJ from '../../assets/imgs/lianjie.png';
import YY from '../../assets/imgs/yinyong.png';
import DM from '../../assets/imgs/daima.png';
import TP from '../../assets/imgs/tupian.png';
import YX from '../../assets/imgs/youxu.png';
import WX from '../../assets/imgs/wuxu.png';
import BT from '../../assets/imgs/biaoti.png';
import FG from '../../assets/imgs/fenge.png';
import BG from '../../assets/imgs/biaoge.png';

export default class Container extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        let {insert,changeData,downloadURL,clearAll,save} = this.props;
        let controllerClass = "btn-group";
        return (
        <div className="row controller markdoan-icon-bg">
            <div className={controllerClass}>&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;
                <button className="btn1 btn-default markdoan-icon-bg" onClick={insert("# ")}><img src={BT} className="markdoan-icon-bg"/></button>
                <button className="btn1 btn-default markdoan-icon-bg" onClick={insert(">")}><img src={YY} className="markdoan-icon-bg"/></button>
                <button className="btn1 btn-default markdoan-icon-bg" onClick={insert("*文本*")}><img src={XT} className="markdoan-icon-bg"/></button>
                <button className="btn1 btn-default markdoan-icon-bg" onClick={insert("**文本**")}><img src={JC} className="markdoan-icon-bg"/></button>
                <button className="btn1 btn-default markdoan-icon-bg" onClick={insert("* ")}><img src={WX} className="markdoan-icon-bg"/></button>
                <button className="btn1 btn-default markdoan-icon-bg" onClick={insert("1. ")}><img src={YX} className="markdoan-icon-bg"/></button>
                <button className="btn1 btn-default markdoan-icon-bg" onClick={insert("`code`")}><img src={DM} className="markdoan-icon-bg"/></button>
                <button className="btn1 btn-default markdoan-icon-bg" onClick={insert("[baidu](http://www.baidu.com)")}><img src={LJ} className="markdoan-icon-bg"/></button>
                <button className="btn1 btn-default markdoan-icon-bg" onClick={insert("\n***\n")}><img src={FG} className="markdoan-icon-bg"/></button>
                <button className="btn1 btn-default markdoan-icon-bg" onClick={insert("![cat](cat.png)")}><img src={TP} className="markdoan-icon-bg"/></button>
                <button className="btn1 btn-default markdoan-icon-bg" onClick={insert("| Tables        | Are           | Cool  |\n| ------------- |:-------------:| -----:|\n| col 3 is      | right-aligned | $1600 |\n| col 2 is      | centered      |   $12 |\n| zebra stripes | are neat      |    $1 |\n")}><img src={LJ} className="markdoan-icon-bg"/></button>
            </div>
        </div>
        )
    }
}