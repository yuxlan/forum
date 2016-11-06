import * as types from '../constants/index'
import {createReducer} from 'redux-immutablejs'
import {fromJS} from 'immutable'

const initialState = fromJS({
	isFetching:false,
	isMore:true,
    items:[],
    count:0
});

export const articleList = createReducer(initialState,{
    [types.ARTICLE_LIST_REQUEST]:(state,action) => state.set('isFetching',true),
    [types.ARTICLE_LIST_SUCCESS]:(state,action) => {
        console.log(action.json.data);
        return state.merge({
            isFetching:false,
            isMore: !(action.json.data.length < action.itemsPerPage),
            items: action.isAdd?state.get('items').concat(action.json.data):action.json.data,
            count:action.json.count
        })
    }
});

export const articleDetail = createReducer(fromJS({}),{
    [types.ARTICLE_DETAIL_SUCCESS]:(state,action) => {return state.merge(action.articleDetail)},
    [types.ARTICLE_DETAIL_FAILURE]:(state,action) => state,
});