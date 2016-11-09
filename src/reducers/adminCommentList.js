import * as types from '../actions/types'
import {createReducer} from 'redux-immutablejs'
import {fromJS,List} from 'immutable'

const initialState = fromJS({
    items:[]
});

export default createReducer(initialState,{
    [types.GET_ADMINCOMMENT_SUCCESS]:(state,action) => state.set('items',List(action.json.data)),
    [types.DELETE_COMMENT_SUCCESS]:(state,{id}) => {
        // debugger;
        const items = state.get('items');
        var nowindex;
        items.forEach((item,index) => {
            if(item._id == id){
                nowindex = index;
                return false
            }
            return true
        })
        var newitems = items.delete(nowindex)
        return state.set(
            'items',newitems
        );
    }
})