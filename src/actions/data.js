import { FETCH_PROTECTED_DATA_REQUEST, RECEIVE_PROTECTED_DATA } from '../constants/index';
import { parseJSON } from '../utiles/misc';
import { logoutAndRedirect } from './auth';
import api from '../api';

// 获取到的用户信息
export function receiveProtectedData(user) {
    localStorage.setItem('u_id',user.u_id);
    return {
        type: RECEIVE_PROTECTED_DATA,
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
    };
}

export function fetchProtectedDataRequest() {
    return {
        type: FETCH_PROTECTED_DATA_REQUEST,
    };
}

export function fetchProtectedData(u_loginname,u_psw) {
    return (dispatch) => {
        dispatch(fetchProtectedDataRequest());
        return api.userLogin(u_loginname,u_psw)
            .then(parseJSON)
            .then(response => {
                dispatch(receiveProtectedData(response.u_id));
            })
            .catch(error => {
                dispatch(logoutAndRedirect(error));
            });
    };
}