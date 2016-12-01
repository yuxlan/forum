// 使用axios获取api接口

require('es6-promise').polyfill();

import axios from 'axios';// 请求http

import {API_ROOT} from '../config';
//import {getCookie,signOut} from '../utiles/authService'

axios.defaults.baseURL = API_ROOT;   // 基本url
//console.log('API_ROOT:',API_ROOT);

/*axios.defaults.withCredentials = true;

axios.interceptors.request.use(function(config){  // 请求头信息
    config.headers = config.headers || {};
    if(getCookie('token')){
        config.headers.Authorization = 'Bearer '+getCookie('token').replace(/(^\")|(\"$)/g,'');
    }
    return config;
},function(error){
    return Promise.reject(error);
});

axios.interceptors.response.use(function(response){  // 处理401
     if(response.status === 401){
         signOut();
         window.location.pathname = '/login';
     }
     return response;
},function(err){
    return Promise.reject(err);
});*/

export const TagResource = (method, data, api='public/tags') => { // 标签,返回array
    return axios[method](api, data);
};

export const VerifyResource = (method,data,api='public/get_verify') => { // 获取五位随机验证码，返回str
    return axios[method](api,data);
};

export const KeyResource = (method,data,api='safe/secret_key') => { // 获取密钥，后期将全部带密钥访问，返回str
    return axios[method](api,data);
};

export const RegisterResource = (method,data,api='sign_up') => { // 注册，成功返回u_id，失败返回codeState
    return axios[method](api,data);
};

export const LoginResource = (method,data,api='sign_in') => { // 登录，成功返回用户有关所有信息，失败返回codeState
    return axios[method](api,data);
};

export const QueryUserResource = (method,data,api='u/query') => { // 查询用户信息，通过u_id,成功返回用户所有信息，失败返回codeState
    return axios[method](api,data);
};

export const UpdateResource = (method,data,api='u/update') => { // 更新用户信息，类似于设置用户信息
    return axios[method](api,data);
};

export const VerifyEmailResource = (method,data,api='u/email/verify') => { // 验证邮箱
    return axios[method](api,data);
};

export const ConfirmEmailResource = (method,data,api='u/email/confirm') => { // 邮箱验证通过
    return axios[method](api,data);
};

export const ChangeEmailResource = (method,data,api='u/email/change') => { // 修改用户邮箱
    return axios[method](api,data);
};

export const QeuryReputationResource = (method,data,api='/u/rep/history') => { // 查询声望变化
    return axios[method](api,data);
};

export const AddArticleResource = (method,data,api='t/add') => { // 添加文章，使用markdown，成功返回t_id
    return axios[method](api,data);
};

export const DeleteArticleResource = (method,data,api='t/del') => { // 删除文章，需要用户名和密码，以及文章id
    return axios[method](api,data);
};

export const GetArticleResource = (method,data,api='t/display') => { // 获取文章，通过t_tags获取，成功返回文章id，失败返回codeState
    return axios[method](api,data);
};

export const QueryArticleResource = (method,data,api='t/query') => { // 查询文章信息，通过t_id，成功返回文章的所有信息
    return axios[method](api,data);
};

export const QueryCommentResource = (method,data,api='c/query') => { // 获取评论信息
    return axios[method](api,data);
};

export const AddCommentResource = (method,data,api='c/add') => { // 添加评论
    return axios[method](api,data);
};

export const DeleteCommentResource = (method,data,api='c/del') => { // 删除评论
    return axios[method](api,data);
};