import React,{Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as Actions from '../../actions'
import Tags from './tags'
import Articles from './article'
import Nav from './navbar'
import Footer from './footer'
import LoadMore from './loadMore'
import ScrollTop from '../ScrollTop'
import {Link} from 'react-router';

const mapStateToProps = (state) => {

    return {
        tagList:state.tagList.toJS(),
        articleList:state.articleList.toJS(),
        options:state.options.toJS(),
        auth:state.auth.toJS()
    }
};

const mapDispatchToProps = dispatch => {
    return {
        actions:bindActionCreators(Actions,dispatch)
    }
};

@connect(mapStateToProps,mapDispatchToProps)
export default class Home extends Component{
    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount(){

        console.log('didmount');
        const{actions,tagList,articleList} = this.props;
        if(tagList.length < 1){
            actions.getTagList()
        }
        // if(articleList.items.length < 1){
        actions.getArticleList();
        // }
        //bug!

        // let token = getCookie('token');
        // if(token){
        //     actions.loginSuccess(token);
        //     actions.getUserInfo(token);
        // }
        // actions.loginSuccess(token);
        // debugger;
        // let {auth} = this.props;
        // if(auth.token&&!auth.user){
        //     actions.getUserInfo();
        // }
    }

    handleChange(e,option,isAdd=false){
        e.preventDefault();
        const {actions} = this.props;
        actions.changeOptions(option);
        actions.getArticleList(isAdd)
    }

    render(){
        const {tagList,articleList,options,actions,auth,location,showmsg,children} = this.props;

        return (

            <div className="home-container">
                <Nav changeStyleMode={actions.changeStyleMode}
                     location={location}
                     auth={auth}
                     logout={actions.logout}/>
                <div className="background">
                </div>
                <div className="outer-container">
                    <div className="wrap-container">
                        <div className="content-outer">
                            <div className="content-inner">
                                <Tags tagList={tagList}
                                      options={options}
                                      isFetching={articleList.isFetching}
                                      changeSort={this.handleChange}/>
                            </div>
                        </div>
                    </div>
                </div>
                <ScrollTop/>
                <Footer />
            </div>

        )
    }
}