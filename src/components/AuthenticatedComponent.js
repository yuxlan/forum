// 已经登录注册之后的处理

import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';
import * as actionCreators from '../actions/auth';

function mapStateToProps(state) {
    return {
        userId: state.auth.userId,
        isAuthenticated: state.auth.isAuthenticated,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actionCreators, dispatch);
}


export function requireAuthentication(Component) {
    class AuthenticatedComponent extends React.Component {
        componentWillMount() {
            this.checkAuth();
            this.state = {
                loaded_if_needed: false,
            };
        }

        componentWillReceiveProps(nextProps) {
            this.checkAuth(nextProps);
        }

        checkAuth(props = this.props) {
            if (!props.isAuthenticated) {
                const u_id = localStorage.getItem('u_id');
                if (!u_id) {
                    browserHistory.push('/');
                } else {
                    //this.props.loginUserSuccess(u_id);
                    this.setState({
                        loaded_if_needed: true,
                    });
                }
            } else {
                this.setState({
                    loaded_if_needed: true,
                });
            }
        }

        render() {
            return (
                <div>
                    {this.props.isAuthenticated && this.state.loaded_if_needed
                        ? <Component {...this.props} />
                        : null
                    }
                </div>
            );

        }
    }

    AuthenticatedComponent.propTypes = {
        loginUserSuccess: React.PropTypes.func,
        isAuthenticated: React.PropTypes.bool,
    };

    return connect(mapStateToProps, mapDispatchToProps)(AuthenticatedComponent);
}
