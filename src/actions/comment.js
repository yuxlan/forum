/*
 * 用户评论文章或者问答，包括回复评论等相关操作
 * 以及个人中心的用户评论管理
 */

import * as types from './types'
import api from '../api'
import {showMsg} from './other'
import {commentsNumberAdd} from './article'

// 获取评论列表
export const getCommentList = (id) => {
    return {
        type:types.COMMENT_LIST,
        promise:api.getCommentList(id)
    }
};

// 添加评论
export function addComment(comment){
    return (dispatch,getState) => {
        return api.addNewComment(comment)
            .then(response => ({json:response.data,status:response.statusText}))
            .then(({json,status}) => {
                if(status !== 'OK'){
                    return dispatch(showMsg(json.data.error_msg) || '添加评论失败')
                }
               
                dispatch(showMsg('添加评论成功','success'));
                dispatch(commentsNumberAdd());
                return dispatch(receiveAddComment(json.data))
            }).catch(e => {
                return dispatch(showMsg(e.data.error_msg||'添加评论失败'))
            })

    }
}


function receiveAddComment(comment){
    return {
        type:types.ADD_COMMENT_SUCCESS,
        comment:comment
    }
}

// 回复
export function addReply(cid,reply){
    return (dispatch,getState) => {
        return api.addNewReply(cid,reply)
            .then(response => ({json:response.data,status:response.statusText}))
            .then(({json,status}) => {
                if(status !== 'OK'){
                    return dispatch(showMsg('回复失败'))
                }
                dispatch(showMsg('添加回复成功','success'));
                return dispatch(receiveAddReply(cid,json.data))
            }).catch(err => {
                dispatch(err.data.error_msg||'回复失败')
            })
    }
}

function receiveAddReply(cid,replys){
    return {
        type:types.ADD_REPLY_SUCCESS,
        cid:cid,
        replys:replys
    }
}