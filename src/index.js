// 应用的入口，view

import React from 'react';
import {render} from 'react-dom';
import {Router,browserHistory} from 'react-router';
import {syncHistoryWithStore} from 'react-router-redux';
import {Provider} from 'react-redux';

import 'font-awesome/css/font-awesome.css';
import 'react-s-alert/dist/s-alert-default.css';
import 'bootstrap/dist/css/bootstrap.css';
import './stylesheets/index.less';


import routes from './routes';

import configureStore from './store/configureStore';

var store = configureStore(browserHistory);
var history = syncHistoryWithStore(browserHistory,store);

render(
    <Provider store={store}>
        <Router history={history}>
            {routes()}
        </Router>
    </Provider>
    ,document.getElementById('root')
)
