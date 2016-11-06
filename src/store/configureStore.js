// redux的store流程，处理reducers，以及存储数据状态

/*import {createStore,compose,applyMiddleware} from 'redux'
import thunkMiddleware from 'redux-thunk'
import {routerMiddleware} from 'react-router-redux'
import {Iterable} from 'immutable'

import promiseMiddleware from '../api/promiseMiddleware'
import {reducer, rootReducer} from '../reducers'


export default function configureStore(history){
    let middleware = [thunkMiddleware,promiseMiddleware,routerMiddleware(history)];
    let finalCreateStore;
    finalCreateStore = compose(applyMiddleware(...middleware));
    const store = finalCreateStore(createStore)(reducer);
    
    return store
}*/    // 另一种写法

/*import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from '../reducers';

const debugware = [];
if (process.env.NODE_ENV !== 'production') {
    const createLogger = require('redux-logger');

    debugware.push(createLogger({
        collapsed: true,
    }));
}

export default function configureStore(initialState) {
    const store = createStore(
        rootReducer,
        initialState,
        applyMiddleware(thunkMiddleware, ...debugware)
    );

    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('../reducers', () => {
            const nextRootReducer = require('../reducers/index').default;

            store.replaceReducer(nextRootReducer);
        });
    }

    return store;
}
*/

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