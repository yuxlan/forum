import React from 'react'
import {Link} from 'react-router'

export default class AdminPage extends React.Component{
    render(){
        const style = {marginRight:'20px'};
        return (
            <div className="col-sm-offset-2">
                <div className="jumbotron" style={style}>
                    <h3>个人中心</h3>
                    <p>
                    </p>
                    <Link className="btn btn-lg btn-success" to="/write" style={{color:'white'}}>
                        <i className="fa fa-bold"> </i>&nbsp;&nbsp;添加新文章
                    </Link>
                </div>
            </div>
        )
    }
}