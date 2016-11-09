//路由入口

import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import $ from 'jquery';

import * as Actions from '../actions';
import ScrollTop from '../components/ScrollTop';
import Toaster from '../components/Toaster';


const mapStateToProps = state => {
    return {
        showmsg:state.showmsg.toJS(),
    }
};

const mapDispatchToProps = dispatch => {
    return {
        actions:bindActionCreators(Actions,dispatch)
    }
};

@connect(mapStateToProps,mapDispatchToProps)
export default class App extends React.Component{
    constructor(props){
        super(props)
    }

    static fetchDate(){
        return [];
    }
    componentDidMount(){
        let {auth,actions} = this.props;
        if(auth.token&&!auth.user){
            actions.getUserInfo();
        }
        window.addEventListener('scroll',function(e){
            console.log(window.scrollY)
        })
        $('body').scroll(function(){
            console.log('top-box-sc')
        })
    }

    render(){

        const {showmsg,actions,children} = this.props;

        return (
            <div className="main-container">
                {children}
                <Toaster msg={showmsg} hideMsg={actions.hideMsg} />
                <ScrollTop />
            </div>
        )
    }
}