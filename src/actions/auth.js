// 用户的登录注册行为

import { browserHistory } from 'react-router';

import {
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAILURE,
    LOGIN_USER_REQUEST,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAILURE,
    LOGOUT_USER,
} from '../constants/index';

import { parseJSON } from '../utiles/misc';
import api from '../api';

// 注册
export function registerUserRequest() {
    return {
        type: REGISTER_USER_REQUEST,
    };
}
export function registerUserSuccess(u_id) {
    localStorage.setItem('u_id', u_id);
    return {
        type: REGISTER_USER_SUCCESS,
        payload: {
            u_id,
        },
    };
}
export function registerUserFailure(codeState) {
    localStorage.removeItem('u_id');
    return {
        type: REGISTER_USER_FAILURE,
        payload: {
            codeState,
        },
    };
}
export function registerUser(u_email,u_name,u_psw) {
    return function (dispatch) {
        dispatch(registerUserRequest());
        return api.userRegister(u_email,u_name,u_psw)
            .then(parseJSON)
            .then(response => {
                try {
                    dispatch(registerUserSuccess(response.u_id));
                  //  browserHistory.push('/personalpage');
                } catch (e) {
                    dispatch(registerUserFailure(response.codeState));
                }
            })
            .catch(error => {
                dispatch(registerUserFailure(error));
            });
    };
}

// 登录
export function loginUserRequest() {
    return {
        type: LOGIN_USER_REQUEST,
    };
}
export function loginUserSuccess(u_id) {
    localStorage.setItem('u_id', u_id);
    return {
        type: LOGIN_USER_SUCCESS,
        payload: {
            u_id,
        },
    };
}
/*
export function loginUserSuccess(user) {
    localStorage.setItem('u_id',user.u_id);
    return {
        type: LOGIN_USER_SUCCESS,
        payload:{
            u_id: user.u_id,
            u_name: user.u_name,
            u_email: user.u_email,
            u_email_confirm: user.u_email_confirm,
            u_level: user.u_level,
            u_reputation: user.u_reputation,
            u_realname: user.u_realname,
            u_blog: user.u_blog,
            u_github: user.u_github,
            u_articles: user.u_articles,
            u_questions: user.u_questions,
            u_answers: user.u_answers,
            u_watchusers: user.u_watchusers,
            u_tags: user.u_tags,
            u_intro: user.u_intro,
        },
    }
}
*/
export function loginUserFailure(codeState) {
    localStorage.removeItem('u_id');
    return {
        type: LOGIN_USER_FAILURE,
        payload: {
            codeState,
        },
    };
}
export function loginUser(u_loginname,u_psw) {
    return function (dispatch) {
        dispatch(loginUserRequest());
        return api.userLogin(u_loginname,u_psw)
            .then(parseJSON)
            .then(response => {
                try {
                    dispatch(loginUserSuccess(response.u_id));
                    //  browserHistory.push('/personalpage');
                } catch (e) {
                    alert(e);
                    dispatch(loginUserFailure(response.codeState));
                }
            })
            .catch(error => {
                dispatch(loginUserFailure(error));
            });
    };
}


// 退出
export function logout() {
    localStorage.removeItem('u_id');
    return {
        type: LOGOUT_USER,
    };
}

// 跳转路径
export function logoutAndRedirect() {
    return (dispatch) => {
        dispatch(logout());
        browserHistory.push('/');
    };
}
export function redirectToRoute(route) {
    return () => {
        browserHistory.push(route);
    };
}

