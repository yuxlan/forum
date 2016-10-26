//提示邮箱未验证
import React from 'react';
import {Link} from 'react-router';

import Footer from '../Home/footer';


class HintVerifyEmail extends React.Component{
    render(){
        return(
            <div>
            <div className='container'>
                <div className='row flipInX animated'>
                    <div className='col-sm-8'>
                        <h3 className="text-center">
                        <br/>
                        <strong>
					       实验班问答交流平台
                        </strong>
                        <br/>
                        <br/>
                        <br/>
					   </h3>
                        <hr/>
                    </div>
                </div>
                <div className="container-fluid">
                    <div className="row-fluid">
		                  <div className="span12">
			                 <div className="alert alert-info">
				                <button type="button" className="close" data-dismiss="alert">×</button>
				                <h4>
					               提示!
				                </h4> <strong>提示：</strong>您还未验证邮箱，账号存在风险。
                                <Link to='/verifyemail'>现在去验证 >></Link>
			                 </div>
		                  </div>
	                   </div>
                </div>
            </div>
            <Footer />
            </div>
        );
    }
}

export default HintVerifyEmail;