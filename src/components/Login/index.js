//登录
import React,{Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {reduxForm} from 'redux-form'
import {Link} from 'react-router'
import * as Actions from '../../actions'
import SNSLogin from './snsLogin'

const mapStateToProps = (state) => {
    return {
        sns:state.sns.toJS()
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions:bindActionCreators(Actions,dispatch)
    }
};

const validate = values => {
    const errors = {};
    if(!values.email){
        errors.email = 'Required';
    }

    if(!values.password){
        errors.password = 'Required';
    }

    return errors;
};

@connect(mapStateToProps,mapDispatchToProps)
@reduxForm({
    form:'signin',
    fields:['email','password'],
    validate
})
export default class Login extends Component{
    constructor(props){
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e){
        e.preventDefault();
        console.log('login');
        const {values} = this.props;
        console.log(values);
        const {actions} = this.props;
        actions.localLogin(values);
    }
    componentDidMount(){
        const {actions,sns} = this.props;
        if(sns.logins.length <1){
            actions.getSnsLogins();
        }

    }

    validatorCalss(field){
        let initClass = 'form-control'
        if(field.invalid){
            initClass += ' ng-invalid'
        }
        if(field.dirty){
            initClass += ' ng-dirty'
        }
        return initClass
    }

    render(){
        const {sns,fields:{email,password},dirty,invalid} = this.props;

        return (
            <div className="sign">
                <div className='container'>
                    <div className='row flipInX animated'>
                        <div className='col-sm-8'>
                            <h3 className="text-center signtitle">
                                <br/>
                                <br/>
                                <br/>
                                <br/>
                                <br/>
                            </h3>
                            <h4 className="text-center"><strong>欢迎回来</strong></h4>
                            <br />
                            <div className='panel panel-default'>
                                <div className='panel-body'>
                                    <form   id="signin"
                                            name="signin"
                                            onSubmit={this.handleSubmit}
                                            noValidate>
                                        <div className='form-group '>
                                            <label className='control-label label-font'>输入用户名或邮箱
                                            </label>
                                            <input type="email"
                                                   className={ this.validatorCalss(email) }
                                                   {...email} />
                                        </div>
                                        <div className='form-group '>
                                            <label className='control-label label-font'>输入密码
                                            </label>
                                            <input type="password"
                                                   className={ this.validatorCalss(password) }
                                                   {...password} />
                                        </div>
                                        <div className="form-group">
                                            <button className="btn btn-primary btn-lg btn-block"
                                                    type="submit">
                                                登 录
                                            </button>
                                        </div>
                                        <br/>
                                        <Link to='/'>
                                            返回首页
                                        </Link>
                                        <br/>
                                        <br/>
                                        <Link to='/register' className="link-font">
                                            新用户吗？请先前往注册 >>
                                        </Link>
                                    </form>
                                    <hr/>
                                    <p className="text-center">您还可以通过以下方式直接登录</p>
                                    <SNSLogin logins={sns.logins}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
