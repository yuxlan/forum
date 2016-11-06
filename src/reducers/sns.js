import * as types from '../constants/index'
import {createReducer} from 'redux-immutablejs'
import {fromJS} from 'immutable'

export default createReducer(fromJS({
    logins:[]
}),{
    [types.GET_SNSLOGINS_SUCCESS]:(state,{json}) => {return state.set('logins',json.data)},
    [types.GET_SNSLOGINS_FAILURE]:(state,action) => {return state.merge({logins:[]})}
})