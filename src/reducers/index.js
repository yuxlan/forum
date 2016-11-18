import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';
import {routerReducer} from 'react-router-redux';

import apps from './apps';
import showmsg from './showmsg';

import auth from './auth';
import sns from './sns';

import tagList from './tagList';
import articleList from './articleList';
import articleDetail from './articleDetail';
import options from './options';
import commentList from './comment';

import adminQueryReputation from './adminQueryReputation';
import adminCommentList from './adminCommentList';
import adminTagList from './adminTagList';
import adminUserList from './adminUserList';
import adminArticleList from './adminArticleList';

const rootReducer = combineReducers({
    apps,
    form:formReducer,
    routing:routerReducer,
    showmsg,
    auth,
    sns,
    tagList,
    articleList,
    options,
    articleDetail,
    commentList,
    adminCommentList,
    adminTagList,
    adminUserList,
    adminArticleList,
    adminQueryReputation
});

export default rootReducer
