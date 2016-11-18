import * as types from '../actions/types';
import {createReducer} from 'redux-immutablejs'
import {fromJS} from 'immutable'

const initialState = fromJS({
    reputationHistory:'',
});

export default createReducer(initialState,{
    [types.ARTICLE_DETAIL_SUCCESS]:(state,action) => {
        console.log('article_details:', action.json);
        return state.merge({
            reputationHistory:action.json.history,
        })
    },
    [types.ARTICLE_DETAIL_FAILURE]:(state,action) => state,
});

