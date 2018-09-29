import socketIOClient from "socket.io-client";
import { ApiAiClient } from "api-ai-javascript";
import {config} from "../../../config/index";

export const REQUEST_CONNECTION = '[CHAT] REQUEST_CONNECTION';
export const NOA_START_WRITING = '[CHAT] NOA_START_WRITING';
export const NOA_END_WRITING = '[CHAT] NOA_END_WRITING';

function connectToChat(data){
    return{
        type: REQUEST_CONNECTION,
        socket: data.socket,
        dialogflow: data.client
    }
}
export const noaStartWriting = () => ({
    type: NOA_START_WRITING,
    writing: true
})
export const noaEndWriting = () => ({
    type: NOA_END_WRITING,
    writing: false
})
export function socketConnect() {
    return dispatch => {
        var socket = socketIOClient.connect();
        var client = new ApiAiClient({accessToken: config.dialogflow.token});
        return dispatch(connectToChat({socket, client}));
    }
}
