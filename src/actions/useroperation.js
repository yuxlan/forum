// 用户相关操作

import {push} from 'react-router-redux'

import * as types from '../constants/index'
import api from '../api'
import {getTagList} from './article'
import {showMsg} from './other'

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
                dispatch(showMsg('上传文章成功','success'));
                return dispatch({
                    type:types.ADD_ARTICLE_SUCCESS,
                    json:json
                })
            })
            .catch(error => {
                dispatch(showMsg(error.t_id.error_msg||'上传文章失败'))
            })
    }
};

// 删除文章
export const deleteArticle = (u_id,u_psw,t_id) => {
    return (dispatch,getState) => {
        return api.deleteArticle(u_id,u_psw,t_id)
            .then(response => ({
                json:response.t_id,
                status:response.code
            }))
            .then(({json,status}) => {
                if(status != 1){
                    return ;
                }
                dispatch(showMsg('删除文章成功','success'));
                return dispatch({
                    type:types.DELETE_ADMINARTICLE_SUCCESS,
                    t_id:t_id,
                })
            })
            .catch(error => {
                return dispatch(showMsg('删除文章失败'))
            })
    }
};