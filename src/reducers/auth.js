// 用户登录注册之后的数据变化

import { createReducer } from '../utiles/misc';
import {
    REGISTER_USER_SUCCESS,
    REGISTER_USER_REQUEST,
    REGISTER_USER_FAILURE,
    LOGIN_USER_REQUEST,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAILURE,
    LOGOUT_USER,
} from '../actions/types';

const initialState = {
    userId: null,
   // userName: null,
    isAuthenticated: false,
    isAuthenticating: false,
    statusText: null,
    isRegistering: false,
    isRegistered: false,
    registerStatusText: null,
};

export default createReducer(initialState, {
    [REGISTER_USER_REQUEST]: (state) =>
        Object.assign({}, state, {
            isRegistering: true,
        }),
    [REGISTER_USER_SUCCESS]: (state, u_id) =>
        Object.assign({}, state, {
            isAuthenticating: false,
            isAuthenticated: true,
            isRegistering: false,
            //token: payload.token,
            userId: payload.u_id,
            registerStatusText: '你已经注册成功.',
        }),
    [REGISTER_USER_FAILURE]: (state, codeState) =>
        Object.assign({}, state, {
            isAuthenticated: false,
           // token: null,
            userId: null,
            registerStatusText: `注册失败: ${codeState}`,
        }),
    [LOGIN_USER_REQUEST]: (state) =>
        Object.assign({}, state, {
            isAuthenticating: true,
            statusText: null,
        }),
    [LOGIN_USER_SUCCESS]: (state, u_id) =>
        Object.assign({}, state, {
            isAuthenticating: false,
            isAuthenticated: true,
           // token: payload.token,
            userId: payload.u_id,
            statusText: '你已经成功登陆.',
        }),
    [LOGIN_USER_FAILURE]: (state, codeState) =>
        Object.assign({}, state, {
            isAuthenticating: false,
            isAuthenticated: false,
           // token: null,
            userId: null,
            statusText: `验证失败: ${codeState}`,
        }),
    [LOGOUT_USER]: (state) =>
        Object.assign({}, state, {
            isAuthenticated: false,
           // token: null,
            userId: null,
            statusText: '你已经成功退出.',
        }),
});
