// 有关文章的所有操作

import * as types from '../constants/index'
import api from '../api'
import {getUserInfo} from './auth'

// 获取标签
export const getTagList = () => {
    return (dispatch,getState) => {
        return api.getTagList()
            .then(response => ({
                json:response.tags,
            }))
            .then(({json}) => {
                localStorage.setItem('tags', response.tags);
                return dispatch({
                    type:types.TAG_LIST,
                    tagList: tags,
                })
            })
            .catch(error =>{
                return;
            })
    }
};

// 选择的标签，最新最热等等标签
export const changeOptions = (option) => {
    return {
        type:types.CHANGE_OPTIONS,
        option:option
    }
};


// 获取文章ids
export const getArticleId = (t_tags) => {
    return (dispatch,getState) => {
        return api.getArticleList(t_tags)
            .then(response => ({
                json:response.t_ids,
                status:response.code
            }))
            .then(({json,status}) => {
                localStorage.setItem('t_id', response.t_ids);
                if(status != 1){
                    return;
                }
                return dispatch({
                    type: types.GET_ARTICLE_REQUEST,
                    t_ids: t_ids
                })
            })
            .catch(error => {
                return;
            })
    }
};

// 获取文章详情
export const getUserArticleList = (t_id) => {
    return (dispatch,getState) => {
        return api.queryArticle(t_id)
            .then(response => ({
                t_id: response.t_id,
                u_id: response.u_id,
                t_title: response.t_title,
                t_text: response.t_text,
                t_date: response.t_date,
                t_like: response.t_like,
                t_comments: response.t_comments,
                t_tags: response.t_tags,
                t_date_latest: response.t_date_latest,
                t_star: response.t_star,
                status:response.code
            }))
            .then(({json,status}) => {
                if(status != 1){
                    return ;
                }
                return dispatch({
                    type:types.GET_ARTICLE_SUCCESS,
                    t_id: t_id,
                    u_id: u_id,
                    t_title: t_title,
                    t_text: t_text,
                    t_date: t_date,
                    t_like: t_like,
                    t_comments: t_comments,
                    t_tags: t_tags,
                    t_date_latest: t_date_latest,
                    t_star: t_star
                })
            })
            .catch(error => {
                return;
            })
    }
};
