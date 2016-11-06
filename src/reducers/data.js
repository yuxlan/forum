import { RECEIVE_PROTECTED_DATA, FETCH_PROTECTED_DATA_REQUEST } from '../constants';
import { createReducer } from '../utiles/misc';

const initialState = {
    data: null,
    isFetching: false,
    loaded: false,
};

export default createReducer(initialState, {
    [RECEIVE_PROTECTED_DATA]: (state, u_id) =>
        Object.assign({}, state, {
            u_id: u_id,
            isFetching: false,
            loaded: true,
        }),
    [FETCH_PROTECTED_DATA_REQUEST]: (state) =>
        Object.assign({}, state, {
            isFetching: true,
        }),
});
