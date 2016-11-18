import * as types from '../actions/types'
import {createReducer} from 'redux-immutablejs'
import {fromJS} from 'immutable'

const initialState = fromJS({
    articleId:'',
    userId:'',
    articleTitle:'',
    articleText:'',
    articleDate:'',
    articleLike:'',
    articleComments:'',
    articleTags:'',
    articleDateLatest:'',
    articleStar:'',
});

export default createReducer(initialState,{
    [types.ARTICLE_DETAIL_SUCCESS]:(state,action) => {
        console.log('article_details:', action.json);
        return state.merge({
            articleId:action.json.t_id,
            userId:action.json.u_id,
            articleTitle:action.json.t_title,
            articleText:action.json.t_text,
            articleDate:action.json.t_date,
            articleLike:action.json.t_like,
            articleComments:action.json.t_comments,
            articleTags:action.json.t_tags,
            articleDateLatest:action.json.t_date_latest,
            articleStar:action.json.t_star,
        })
    },
    [types.ARTICLE_DETAIL_FAILURE]:(state,action) => state,
});