import * as types from '../actions/types'
import {createReducer} from 'redux-immutablejs'
import {fromJS,List} from 'immutable'

const initialState = fromJS({
    updatedUser:false
});

export default createReducer(initialState,{
    [types.UPDATE_USER_INFORMATION_FAILURE]: (state,action) => state,
    [types.ADD_ADMINUSER_SUCCESS]:(state,action) => {
        console.log('updateusersuccess:', action.json);
        return state.merge({
            updatedUser:true,
        })
    },
})