
import {combineReducers} from 'redux';

import messages from './messages';
import chat from './chat';

export default combineReducers({
    messages,
    chat
});
