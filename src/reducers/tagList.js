// 获取标签之后的数据状态变化

import * as types from '../actions/types';
import {createReducer} from 'redux-immutablejs';
import {List} from 'immutable';

export default createReducer(List(),{
    [types.TAG_LIST_SUCCESS]:(state,action) =>  state.merge(action.json),
    [types.TAG_LIST_FAILURE]:(state) => state
})