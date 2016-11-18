// 数据交互方式get||post

import {TagResource,VerifyResource,KeyResource,RegisterResource,LoginResource, QueryUserResource,UpdateResource,
        VerifyEmailResource,ConfirmEmailResource,ChangeEmailResource,
        AddArticleResource,DeleteArticleResource,GetArticleResource,QueryArticleResource,
        QeuryReputationResource} from './resources';

export default {

    // 获取标签
    getTagList: function () {
        let res = TagResource('get');
        console.log('getTagList:',res);
        return res;
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
    userRegister: function (u_email,u_name,u_psw) {
        let res = RegisterResource('post', {u_email, u_name, u_psw});
        console.log('userRegister:', res);
        return res;
    },

    // 用户登录
    userLogin: function (u_loginname,u_psw) {
        let res = LoginResource('post', {u_loginname,u_psw});
        console.log('userLogin:',res);
        return res;
    },

    // 查询用户信息
    queryUser: function (u_id) {
        return QueryUserResource('post', {u_id});
    },

    // 更新用户信息
    updateUser: function (u_id,u_psw,u_realname,u_blog,u_github,u_tags,u_intro) {
        let res = UpdateResource('post', {u_id,u_psw,u_realname,u_blog,u_github,u_tags,u_intro});
        console.log('updateUser:',res);
        return res;
    },

    // 验证邮箱
    verifyEmail: function (u_id,u_email,u_verify) {
        return VerifyEmailResource('post', {u_id,u_email,u_verify});
    },

    // 邮箱验证通过
    confirmEmail: function (u_id,u_psw) {
        return ConfirmEmailResource('post', {u_id,u_psw});
    },

    // 修改用户邮箱
    changeEmail: function (u_id,u_psw,u_email) {
        return ChangeEmailResource('post', {u_id,u_psw,u_email});
    },

    // 查询声望记录
    queryReputation: function (u_id,u_psw) {
        let res = QeuryReputationResource('post',{u_id,u_psw});
        console.log('queryReputation:',res);
        return res;
    },

    // 添加文章
    addArticle: function (u_id,u_psw,u_title,u_text,u_tags) {
        return AddArticleResource('post', {u_id,u_psw,u_title,u_text,u_tags});
    },

    // 删除文章
    deleteArticle: function (u_id,u_psw,t_id) {
        let res = DeleteArticleResource('post', {u_id,u_psw,t_id});
        console.log('deleteArticle:',res);
        return res;
    },

    // 获取文章展示列表
    getArticleList: function (t_tags,show_count) {
        let res = GetArticleResource('post', {t_tags,show_count});
        console.log('ArticleIds:',res);
        return res;
    },

    // 查询文章信息
    queryArticle: function (t_id) {
        let res = QueryArticleResource('post', {t_id});
        console.log('queryArticle:',res);
        return res;
    },

    // 获取评论
    getComment: function (c_id) {
        return QueryCommentResource('post',{c_id});
    },

    // 添加评论
    addComment: function (u_id,u_psw,ec_type,ec_id,c_text){
        return AddCommentResource('post',{u_id,u_psw,ec_type,ec_id,c_text});
    },
    
    // 删除评论
    deleteComment: function (u_id,u_psw,c_id) {
        return DeleteCommentResource('post',{u_id,u_psw,c_id});
    },

}