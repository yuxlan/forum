// redux的store流程，处理reducers，以及存储数据状态

import {createStore,compose,applyMiddleware} from 'redux'
import thunkMiddleware from 'redux-thunk'
import {routerMiddleware} from 'react-router-redux'
import {Iterable} from 'immutable'

import promiseMiddleware from '../api/promiseMiddleware'
import reducer from '../reducers'

export default function configureStore(history){
    let middleware = [thunkMiddleware,promiseMiddleware,routerMiddleware(history)];
    let finalCreateStore;
    finalCreateStore = compose(applyMiddleware(...middleware));
    const store = finalCreateStore(createStore)(reducer);
    return store
}