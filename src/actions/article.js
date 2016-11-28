/*
 * 有关首页显示的相关操作：
 * 获取标签 -> option选择 ->
 * 根据选择的标签获取文章id ->
 * 保存文章id ->
 * 根据文章id获取文章详情
 */

import * as types from './types';
import api from '../api';
import {showMsg} from './other';

// 获取标签
export const getTagList = () => {
    return {
        type:types.TAG_LIST,
        promise:api.getTagList(),
    }
};

// 改变选择的状态，也就是记录选的tags
export const changeOptions = (option) => {
    return {
        type:types.CHANGE_OPTIONS,
        option:option,
    }
};

// 首页文章通过所有的tags获取所有的文章
export const getArticleList = (t_tags,show_count) => {
    return (dispatch,getState) => {
        return api.getArticleList(t_tags,show_count)
            .then(response => ({
                json:response.data,
                status:response.statusText}))
            .then(({json,status}) => {
                console.log('get_t_ids:',json);
                // localStorage.setItem('t_id', json.t_ids);
                return dispatch({
                    type:types.ARTICLE_LIST_SUCCESS,
                    json:json,
                })
            })
            .catch(error => {
                dispatch(showMsg(error));
                return dispatch({
                    type:types.ARTICLE_LIST_FAILURE,
                })
            })
    }
};

// 根据所选的标签获取文章id
/*export const getArticleList = (isAdd) => {
 return (dispatch,getState) => {
 const options = getState().options.toJS();
 return api.getArticleList(options)
 .then(response => ({
 json:response.t_ids,
 status:response.code,
 }))
 .then(({json,status}) => {
 localStorage.setItem('t_id', json);
 if(status != 1){
 return;
 }
 console.log(json);
 return dispatch({
 type:types.ARTICLE_LIST_SUCCESS,
 isAdd:isAdd,
 itemsPerPage:options.itemsPerPage,
 })
 })
 .catch(error => {
 return dispatch({
 type:types.ARTICLE_LIST_FAILURE,
 })
 })
 }
 };*/

// 获取文章详情
export const getArticleDetail = (t_id) => {
    return (dispatch,getState) => {
        return api.queryArticle(t_id)
            .then(response => ({
                status:response.statusText,
                json:response.data,
            }))
            .then(({json,status}) => {
                console.log('getArticleDetail_1:',json);
                return dispatch({
                    type:types.ARTICLE_DETAIL_SUCCESS,
                    json:json,
                })
            })
            .catch(error => {
                return dispatch({
                    type:types.ARTICLE_DETAIL_FAILURE
                })
            })
    }
};
