
import {
    RECEIVE_MESSAGES,
    RECEIVE_MESSAGE
} from '../actions/messages';

const messages  = [
    {
        type: "noa",
        text: "Hello, my name’s Noa. Nice to meet you."
    }
];
export default function messagesReducer(state=messages, action){
    switch (action.type) {
        case RECEIVE_MESSAGES:
            return [
                ...state,
                ...action.messages
            ]
        case RECEIVE_MESSAGE:
            return [
                ...state,
                action.message
            ]
    }
    return state;
}
