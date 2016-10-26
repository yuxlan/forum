//我的文章
import React from 'react';
import {Link} from 'react-router';

import UserFixedPart from './userFixedPart';
import Footer from '../Home/footer';


class MyArticle extends React.Component{
    constructor(props){
        super(props);
    }
    
    componentDidMount(){
        
    }
    
    componentWillUnmount(){
        
    }

    render(){
        return(
            <div>
                <UserFixedPart />
            <div className="container">
                <div className='row flipInX animated'>
                    <div className='showmessages'>
                        <h3 className="text-center messagetitle">
                        <strong>
					       我的文章
                        </strong>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
					   </h3>
                        <hr />
                            <form ref='searchForm' 
                                  className='navbar-form navbar-left animated' >
                                <div className='input-group'>
                                    <input type='text' 
                                           className='form-control' />
                                    <span className='input-group-btn'>
                                        <button className='btn btn-default'> 
                                            <span className='glyphicon glyphicon-search'>
                                            </span>
                                        </button>
                                    </span>
                                </div>
                            </form>
                    </div>
				    <div className='leftnav'>
                      <ul>
                        <br />
  				          <li className='mydata'>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                          <Link to='/mydata'>我的资料</Link></li>
                          <hr />
						  <li className='myprestige'>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                          <Link to='/myprestige'>我的声望</Link></li>
                          <hr />
						  <li className='myattention'>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                          <Link to='/myattention'>我的关注</Link></li>
                          <hr />
					      <li className='mycollection'>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                          <a>我的收藏</a></li>
                          <hr />
						  <li className='myarticle'>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                          <Link to='/myarticle'>我的文章</Link></li>
                          <hr />
					      <li className='myquestion'>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                          <a>我的问答</a></li>
                          <hr />
						  <li className='innermessage'>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                          <a>站内短信</a></li>
                          <hr />
					      <li className='safecenter'>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                          <a>安全中心</a></li>
                          <hr />
                       </ul>
				   </div>
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                </div>
            </div>
            <Footer />
            </div>
        );
    }
}

export default MyArticle;