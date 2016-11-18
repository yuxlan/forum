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
import {fromJS} from 'immutable'

const initialState = fromJS({
    userId: '',
    userName: '',
    userEmail: '',
    userEmail_confirm: '',
    userLevel: '',
    userReputation: '',
    userRealname: '',
    userBlog: '',
    userGithub: '',
    userArticles: '',
    userQuestions: '',
    userAnswers: '',
    userWatchusers: '',
    userTags: '',
    userIntro: '',
    isAuthenticated: false,
    isAuthenticating: false,
    statusText: null,
    isRegistering: false,
    isRegistered: false,
    registerStatusText: null,
});

export default createReducer(initialState, {
    [REGISTER_USER_SUCCESS]:(state,action) => {
        state.merge({
            isAuthenticating: false,
            isAuthenticated: true,
            isRegistering: false,
            userId: action.json.u_id,
            registerStatusText: '你已经注册成功.',
        })},
    [REGISTER_USER_REQUEST]: (state,action) => state.set('isRegistering',true),
    [REGISTER_USER_FAILURE]: (state, action) =>
        state.merge({
            isAuthenticated: false,
           // token: null,
            userId: '',
            registerStatusText: `注册失败`,
        }),
    [LOGIN_USER_REQUEST]: (state,action) => {
        state.merge({
            isAuthenticating: true,
            statusText: null,
        })},
    [LOGIN_USER_SUCCESS]: (state, action) => {
        state.merge({
            isAuthenticating: false,
            isAuthenticated: true,
           // token: payload.token,
            userId: action.json.u_id,
            userName: action.json,u_name,
            userEmail: action.json.u_email,
            userEmail_confirm: action.json.u_email_confirm,
            userLevel: action.json.u_level,
            userReputation: action.json.u_reputation,
            userRealname: action.json.u_realname,
            userBlog: action.json.u_blog,
            userGithub: action.json.u_github,
            userArticles: action.json.u_articles,
            userQuestions: action.json.u_questions,
            userAnswers: action.json.u_answers,
            userWatchusers: action.json.u_watchusers,
            userTags: action.json.u_tags,
            userIntro: action.json.u_intro,
            statusText: '你已经成功登录.',
        })},
    [LOGIN_USER_FAILURE]: (state, payload) => {
        state.merge({
            isAuthenticating: false,
            isAuthenticated: false,
           // token: null,
            userId: '',
            statusText: `登录失败`,
        })},
    [LOGOUT_USER]: (state) => {
        state.merge({
            isAuthenticated: false,
           // token: null,
            userId: '',
            statusText: '你已经成功退出.',
        })},
});
