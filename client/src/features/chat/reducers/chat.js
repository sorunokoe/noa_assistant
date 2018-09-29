
import {
    REQUEST_CONNECTION,
    NOA_START_WRITING,
    NOA_END_WRITING
} from '../actions/chat';

const chat  = {};

export default function chatReducer(state=chat, action){
    switch (action.type) {
        case REQUEST_CONNECTION:
            return {
                socket: action.socket,
                dialogflow: action.dialogflow,
                writing: false
            }
        case NOA_START_WRITING:
            return {
                socket: state.socket,
                dialogflow: state.dialogflow,
                writing: true
            }
        case NOA_END_WRITING:
            return {
                socket: state.socket,
                dialogflow: state.dialogflow,
                writing: false
            }
    }
    return state;
}
