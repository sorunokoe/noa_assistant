import { noaStartWriting, noaEndWriting } from './chat'
import $ from "jquery";

export const RECEIVE_MESSAGES = '[CHAT] RECEIVE_MESSAGES';
export const RECEIVE_MESSAGE = '[CHAT] RECEIVE_MESSAGE';

function receiveMessages(messages) {
    return {
        type: RECEIVE_MESSAGES,
        messages: messages
    }
}
function receiveMessage(message) {
    return {
        type: RECEIVE_MESSAGE,
        message: message
    }
}
export function sendMessage(message){
    return (dispatch, getState) => {

        getState().chat.socket.emit("POST_MESSAGE", {text: message, type: "user"});
        getState().chat.dialogflow.textRequest(message)
        .then((response) => {
            console.log("START WR");
            dispatch(noaStartWriting());
            setTimeout(() => {
                console.log("END WR");
                dispatch(noaEndWriting());
                var answer = response.result.fulfillment.speech;
                getState().chat.socket.emit("POST_MESSAGE", {text: answer, type: "noa"});
            }, message.split(" ").length*500);
        })
        .catch((error) => {
            //TODO: Handle the error by showing in UI
            console.log(error);
        })
    }
}
export function subscribeToMessages() {
    return (dispatch, getState) => {
        getState().chat.socket.on("GET_MESSAGES", data => {
            return dispatch(receiveMessages(data))
        });
    }
}
export function subscribeToMessage() {
    return (dispatch, getState) => {
        getState().chat.socket.on("RECEIVE_MESSAGE", data => {
            return dispatch(receiveMessage(data))
        });
    }
}
//

