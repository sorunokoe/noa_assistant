import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import registerServiceWorker from './registerServiceWorker';

import ChatComponent from './components/Chat';
import chatReducer from './features/Chat/Reducers';

const store = createStore(chatReducer, applyMiddleware(thunk));

require('../public/scss/style.scss');

ReactDOM.render(
    <Provider store={store}>
        <ChatComponent/>
    </Provider>
    , document.getElementById('root')
);
registerServiceWorker();
