// 用户的登录注册行为
// 登录注册 -> 保存用户u_id和u_psw -> 根据用户u_id获取用户的相关信息，并且保存相关信息 -> 将相关信息显示在个人中心的相关页面

import { browserHistory } from 'react-router';

import {
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAILURE,
    LOGIN_USER_REQUEST,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAILURE,
    LOGOUT_USER,
} from './types';

import api from '../api';
import {showMsg} from '../actions/other';
import $ from 'jquery';


// 注册
/*export function registerUserRequest() {
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
 }*/
export const registerUser = (u_email,u_name,u_psw) => {
    return (dispatch,getState) => {
        return api.userRegister(u_email,u_name,u_psw)
            .then(response => ({
                json:response.data,
                status:response.statusText,
            }))
            .then(({json,status}) => {
                if(status !== 'ok'){
                    return dispatch(showMsg('注册失败','fail'));
                }
                console.log('u_id:',json);
                localStorage.setItem('u_id', json.u_id);
                dispatch(showMsg('注册成功','success'));
                return dispatch({
                    type:REGISTER_USER_SUCCESS,
                    json:json
                })
            })
            .catch(error => {
                console.log(error);
                dispatch(showMsg(error||'注册失败'));
            })
    }
};

// 登录
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
export function loginUser(u_loginname,u_psw) {
    return (dispatch,getState) => {
        return api.userLogin(u_loginname,u_psw)
            .then(response => ({
                json:response.data,
                status:response.statusText,
            }))
            .then(({json,status}) => {
                if(status !== 'ok'){
                    return dispatch(showMsg('登录失败'));
                }
                console.log('json:',json);
                localStorage.setItem('u_id',json.u_id);
                dispatch(showMsg('登录成功'));
                return dispatch({
                    type:LOGIN_USER_SUCCESS,
                    json:json
                })
            })
            .catch(error => {
                console.log(error);
                dispatch(showMsg('登录失败'));
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

