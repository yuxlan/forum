// 数据交互方式get||post

import {TagResource,VerifyResource,KeyResource,RegisterResource,LoginResource, QueryUserResource,UpdateResource,
        VerifyEmailResource,ConfirmEmailResource,ChangeEmailResource,
        AddArticleResource,DeleteArticleResource,GetArticleResource,QueryArticleResource} from './resources';

export default {
    // 获取标签
    getTagList: function () {
        return TagResource('get');
    },

    // 获取随机验证码
    getVerify: function () {
        return VerifyResource('get');
    },

    // 获取密钥
    getSecretKey: function () {
        return KeyResource('get');
    },

    // 用户注册
    userRegister: function (data) {
        return RegisterResource('post', data);
    },

    // 用户登录
    userLogin: function (data) {
        return LoginResource('post', data);
    },

    // 查询用户信息
    queryUser: function (data) {
        return QueryUserResource('post', data);
    },

    // 更新用户信息
    updateUser: function (data) {
        return UpdateResource('post', data);
    },

    // 验证邮箱
    verifyEmail: function (data) {
        return VerifyEmailResource('post', data);
    },

    // 邮箱验证通过
    confirmEmail: function (data) {
        return ConfirmEmailResource('post', data);
    },

    // 修改用户邮箱
    changeEmail: function (data) {
        return ChangeEmailResource('post', data);
    },

    // 添加文章
    addArticle: function (data) {
        return AddArticleResource('post', data);
    },

    // 删除文章
    deleteArticle: function (data) {
        return DeleteArticleResource('post', data);
    },

    // 获取文章展示列表
    getArticleList: function (data) {
        return GetArticleResource('post', data);
    },

    // 查询文章信息
    queryArticle: function (data) {
        return QueryArticleResource('post', data);
    },

}