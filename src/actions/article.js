/*
 * 有关首页显示的相关操作：
 * 获取标签 -> option选择 ->
 * 根据选择的标签获取文章id ->
 * 保存文章id ->
 * 根据文章id获取文章详情
 */

import * as types from './types';
import api from '../api';

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

// 根据所选的标签获取文章id
export const getArticleList = (isAdd) => {
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
};

// 获取文章详情
export const getArticleDetail = (t_id) => {
    return (dispatch,getState) => {
        const articlelist = getState().articleList.toJS();
        let t_id = articlelist.t_id;
        return api.queryArticle(t_id)
            .then(response => ({
                status:response.code,
                articleid:response.t_id,
                userid:response.u_id,
                articletitle:response.t_title,
                articletext:response.t_text,
                articledate:response.t_date,
                articlelike:response.t_like,
                articlecomments:response.t_comments,
                articletags:response.t_tags,
                articledatelatest:response.t_date_latest,
                articlestar:response.t_star,
            }))
            .then(({articleid,userid,articletitle,articletext,
                articledate,articlelike,articlecomments,articletags,
                articledatelatest,articlestar,status}) => {
                if(status != 1){
                    return;
                }
                /*   let isLike = false;
                 console.log(auth);
                 if(auth.user){
                 auth.user.likes.forEach(item => {
                 if(item.toString() === article._id){
                 isLike =true
                 }
                 })
                 }*/
                return dispatch({
                    type:types.ARTICLE_DETAIL_SUCCESS,
                    articleDetail:{articleid,userid,articletitle,articletext,
                        articledate,articlelike,articlecomments,articletags,
                        articledatelatest,articlestar}
                    //  articleDetail:{...article,isLike}
                })
            })
            .catch(error => {
                return dispatch({
                    type:types.ARTICLE_DETAIL_FAILURE
                })
            })
    }
};
