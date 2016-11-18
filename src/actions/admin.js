/*
 * 用户的操作，包括：
 * 更改个人信息 -> 邮箱验证身份 ->
 * 管理个人文章，包括发布新文章、删除更改文章等操作 ->
 * 查看个人信息，包括用户的声望变化以及关注的人和收藏的文章等信息 ->
 * 以及后期需要实现的其它功能
 */

import * as types from './types'
import api from '../api'
import {getTagList} from './article'
import {showMsg} from './other'
import {push} from 'react-router-redux'

// 添加文章
export const addArticle = (u_id,u_psw,u_title,u_text,u_tags) => {
    return (dispatch,getState) => {
        return api.addArticle(u_id,u_psw,u_title,u_text,u_tags)
            .then(response => ({
                json:response.t_id,
                status:response.code}))
            .then(({json,status}) => {
                if(status !== 1){
                    return ;
                }
                dispatch(push('/'));
                dispatch(showMsg('发布文章成功','success'));
                return dispatch({
                    type:types.ADD_ARTICLE_SUCCESS,
                    t_id:json,
                })
            })
            .catch(error => {
                dispatch(showMsg(error.t_id.error_msg||'发布文章失败'))
            })
    }
};

// 删除文章
export const deleteArticle = (u_id,u_psw,t_id) => {
    return (dispatch,getState) => {
        return api.deleteArticle(u_id,u_psw,t_id)
            .then(response => ({
                json:response.data,
                status:response.statusText,
            }))
            .then(({json,status}) => {
                if(status !== 'ok'){
                    return ;
                }
                dispatch(showMsg('删除文章成功'));
                return dispatch({
                    type:types.DELETE_ADMINARTICLE_SUCCESS,
                    json: json,
                })
            })
            .catch(error => {
                dispatch(showMsg('删除文章失败'));
                return dispatch({
                    type:types.DELETE_ADMINARTICLE_FAILURE,
                })
            })
    }
};

// 查询声望记录
export const queryReputationHistory = (u_id,u_psw) => {
    return (dispatch,getState) => {
        return api.queryReputation(u_id,u_psw)
            .then(response => ({
                json:response.data,
                status:response.statusText,
            }))
            .then(({json,status}) => {
                if(status !== 'ok'){
                    return dispatch(showMsg('声望更新失败'));
                }
                console.log('json:',json);
                dispatch(showMsg('声望已更新'));
                return dispatch({
                    type:types.QUERY_REPUTATION_SUCCESS,
                    json:json,
                })
            })
            .catch(error => {
                dispatch(showMsg('声望更新失败'));
                return dispatch({
                    type:types.QUERY_REPUTATION_FAILURE,
                })
            })
    }
};

// 更新用户信息
export const updateUserInformation = (u_id,u_psw,u_realname,u_blog,u_github,u_tags,u_intro) => {
    return (dispatch,getState) => {
        return api.updateUser(u_id,u_psw,u_realname,u_blog,u_github,u_tags,u_intro)
            .then(response => ({
                json:response.data,
                status:response.statusText,
            }))
            .then(({json,status}) => {
                if(status !== 'ok'){
                    return dispatch(showMsg('更新用户信息失败'));
                }
                console.log('json:',json);
                dispatch(showMsg('信息已更新'));
                return dispatch({
                    type:types.UPDATE_USER_INFORMATION_SUCCESS,
                    json:json,
                })
            })
            .catch(error => {
                dispatch(showMsg('更新用户信息失败'));
                return dispatch({
                    type:types.UPDATE_USER_INFORMATION_FAILURE,
                })
            })
    }
};