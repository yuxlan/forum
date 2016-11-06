import * as types from '../constants/index'
import api from '../api'
import {showMsg} from './other'

// 获取评论详情
export const getCommentList = (c_id) => {
    return (dispatch,getState) => {
        return api.getComment(c_id)
            .then(response => ({
                c_id: response.c_id,
                u_id: response.u_id,
                ec_type: response.ec_type,
                ec_id: response.ec_id,
                c_date: response.c_date,
                c_like: response.c_like,
                status: response.code,
            }))
            .then(({json, status}) => {
                localStorage.setItem('c_id', response.c_id);
                if (status !== 1) {
                    return;
                }
                return dispatch({
                    c_id: c_id,
                    u_id: u_id,
                    ec_type: ec_type,
                    ec_id: ec_id,
                    c_date: c_date,
                    c_like: c_like,
                })
            }).catch(e => {
                return;
            })
    }
};

// 添加评论
export function addComment(u_id,u_psw,ec_type,ec_id,c_text){
    return (dispatch,getState) => {
        return api.addComment(u_id, u_psw, ec_type, ec_id, c_text)
            .then(response => ({
                json: response.c_id,
                status: response.code,
            }))
            .then(({json, status}) => {
                if (status !== 1) {
                    return dispatch(showMsg(json.error_msg) || '发表评论失败')
                }
                dispatch(showMsg('发表评论成功', 'success'));
                dispatch(commentsNumberAdd());
                return dispatch({
                    c_id: c_id,
                })
                    .catch(e => {
                        return dispatch(showMsg(e.error_msg || '发表评论失败'))
                    })
            })
    }
};

// 删除评论
export const deleteComment = (u_id,u_psw,c_id) => {
        return (dispatch,getState) => {
            return api.deleteComment(u_id,u_psw,c_id)
            .then(response => ({
                    json:response.t_id,
                    status:response.code
                }))
                .then(({json,status}) => {
                    if(status != 1){
                        return ;
                    }
                    dispatch(showMsg('删除评论成功','success'));
                    return dispatch({
                        type:types.DELETE_COMMENT_SUCCESS,
                        t_id:t_id,
                    })
                })
                .catch(error => {
                    return dispatch(showMsg('删除评论失败'))
                })
        }
};

// 改变评论数量
export const commentsNumberAdd = () => {
    return {
        type:types.ADD_COMMENT_NUMBER
    }
}