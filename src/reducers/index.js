import {combineReducers} from 'redux'
import {reducer as formReducer} from 'redux-form'
import {routerReducer} from 'react-router-redux'

import showmsg from './showmsg'
import auth from './auth'
import data from './data'
import tagList from './tagList'
import {articleList,articleDetail,prenextArticle} from './article'
import commentList from './comment'
import options from './options'
import userCommentList from './userCommentList'
import userTagList from './userTagList'
import userUserList from './userUserList'
import userArticleList from './userArticleList'

const rootReducer = combineReducers({
    form:formReducer,
    routing:routerReducer,
    showmsg,
    auth,
    data,
    tagList,
    options,
    articleDetail,
    prenextArticle,
    commentList,
    userCommentList,
    userTagList,
    userUserList,
    adminArticleList
})

export default rootReducer
