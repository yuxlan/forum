// 第三方登录，暂未实现，后期进一步实现

import * as types from '../actions/types'
import {createReducer} from 'redux-immutablejs'
import {fromJS} from 'immutable'

export default createReducer(fromJS({
    logins:[]
}),{
    [types.GET_SNSLOGINS_SUCCESS]:(state,{json}) => {return state.set('logins',json.data)},
    [types.GET_SNSLOGINS_FAILURE]:(state,action) => {return state.merge({logins:[]})}
})