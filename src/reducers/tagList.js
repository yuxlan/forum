import * as types from '../constants/index'
import {createReducer} from 'redux-immutablejs'
import {List} from 'immutable'

export default createReducer(List(),{
    [types.TAG_LIST_SUCCESS]:(state,{json}) => {state=List();return state.merge(json.data)},
    [types.TAG_LIST_FAILURE]:(state) => state
})