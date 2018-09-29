import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger'
import registerServiceWorker from './registerServiceWorker';
import { socketConnect } from './features/chat/actions/chat';

import ChatComponent from './components/Chat';
import chatReducer from './features/chat/reducers';

const loggerMiddleware = createLogger()

require('../public/scss/style.scss');

const store = createStore(chatReducer, applyMiddleware(thunkMiddleware, loggerMiddleware));

store.dispatch(socketConnect())

ReactDOM.render(
    <Provider store={store}>
        <ChatComponent/>
    </Provider>
    , document.getElementById('root')
);
registerServiceWorker();
