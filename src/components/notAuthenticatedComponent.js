// 对于没有登录注册的处理

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


export function requireNoAuthentication(Component) {

    class notAuthenticatedComponent extends React.Component {

        constructor(props) {
            super(props);
            this.state = {
                loaded: false,
            };
        }

        componentWillMount() {
            this.checkAuth();
        }

        componentWillReceiveProps(nextProps) {
            this.checkAuth(nextProps);
        }

        checkAuth(props = this.props) {
            if (props.isAuthenticated) {
                browserHistory.push('/');
            } else {
                const u_id = localStorage.getItem('u_id');
                if (u_id) {
                  //  this.props.loginUserSuccess(u_id);
                    browserHistory.push('/');
                } else {
                    this.setState({
                        loaded: true,
                    });
                }
            }
        }

        render() {
            return (
                <div>
                    {!this.props.isAuthenticated && this.state.loaded
                        ? <Component {...this.props} />
                        : null
                    }
                </div>
            );

        }
    }

    notAuthenticatedComponent.propTypes = {
        loginUserSuccess: React.PropTypes.func,
        isAuthenticated: React.PropTypes.bool,
    };

    return connect(mapStateToProps, mapDispatchToProps)(notAuthenticatedComponent);

}
