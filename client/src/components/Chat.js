
import React, {Component} from 'react';
import {connect} from 'react-redux';
import { subscribeToMessages, subscribeToMessage, sendMessage } from '../features/chat/actions/messages'
import $ from "jquery";
require("../../public/scss/chat/style.scss")

class AuthComponent extends Component{
    constructor(props) {
        super(props);
        this.recording=false;
        this.recognition=new webkitSpeechRecognition();
    }
    scrollDown(){
        $(".chat-div").animate({ scrollTop: ($(".chat-div").height()*this.props.messages.length) }, 0);
    }
    sendMessage(event) {
        var code = event.keyCode || event.which;
        var message = this.refs.writedMessage.value;
        if((!code || code === 13) && message.trim().length>0) {
            this.props.sendMessage(message);
            this.refs.writedMessage.value = "";
            if (event.preventDefault) {
                event.preventDefault()
            }
        }
    }
    recordMessage(){
        var self = this;
        if(!this.recording) {
            if (!('webkitSpeechRecognition' in window)) {
                upgrade();
            } else {
                var final_transcript = "";
                this.recording = true;
                $(".start").show();
                $(".stop").hide();
                this.recognition.continuous = true;
                this.recognition.interimResults = true;
                this.recognition.lang = "en-US";
                this.recognition.start();
                this.recognition.onresult = function (event) {
                    var interim_transcript = '';
                    for (var i = event.resultIndex; i < event.results.length; ++i) {
                        if (event.results[i].isFinal) {
                            final_transcript += event.results[i][0].transcript;
                        } else {
                            interim_transcript += event.results[i][0].transcript;
                        }
                    }
                    self.refs.writedMessage.value = interim_transcript;
                }
                this.recognition.onend = function () {
                    self.refs.writedMessage.value = final_transcript;
                    // self.sendMessage(final_transcript);
                }
            }
        }else{
            $(".start").hide();
            $(".stop").show();
            this.recording = false;
            this.recognition.stop();
        }
    }
    componentDidMount(){
        $(".start").hide();
        this.props.subscribeToMessages();
        this.props.subscribeToMessage();
    }
    componentDidUpdate(){
        if(this.props.chat.writing){
            $(".loading").show();
        }else{
            $(".loading").hide();
        }
        this.scrollDown();
    }
    render(){
        return(
            <div className={"block"}>
                <div className={"display-div"}>
                    <div className={"settings-div"}>
                        <img className={"burger-img"} src={"./img/chat/menu.svg"} />
                        <h1>NoA</h1>
                        <img className={"settings-img"} src={"./img/chat/settings.svg"} />
                    </div>
                    <div className={"chat-div"}>
                        {this.props.messages.map((message, index) =>
                            <div className={"wrapper "+message.type+"-wrapper"} key={index}>
                                <div className={"message "+message.type+"-message"}>
                                    <p>{message.text}</p>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className={"loading"}>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                </div>
                <div className={"interface-div"}>
                    <div className={"operations-div"}>
                        <div className={"options-div"}>
                            <img className={"options-img"} src={"./img/chat/list.svg"} />
                            <img className={"options-img"} src={"./img/chat/meeting.svg"} />
                        </div>
                        {/*<div className={"suggestions-div"}>*/}
                            {/*<button className={"suggestions"}><p><span>Let's talk</span></p></button>*/}
                        {/*</div>*/}
                        <div className={"microphone-div"}>
                            <button onClick={this.recordMessage.bind(this)} className={"microphone"}>
                                <p className={"start"}>
                                    <span>
                                        <img src={"./img/chat/microphone.svg"}/>
                                    </span>
                                </p>
                                <p className={"stop"}>
                                    <span>
                                        <img src={"./img/chat/microphone.svg"}/>
                                    </span>
                                </p>
                            </button>
                        </div>
                    </div>
                    <div className={"writeplace-div"}>
                        <textarea ref="writedMessage" onKeyPress={this.sendMessage.bind(this)} placeholder={"Write a message.."}></textarea>
                        <img onClick={this.sendMessage.bind(this)} className={"send-img"} src={"./img/chat/send.svg"} />
                    </div>
                </div>
            </div>
        )
    }
}
const mapStateToProps = state => ({
    messages: state.messages,
    chat: state.chat
});
const mapDispatchToProps = dispatch => ({
    sendMessage: text => dispatch(sendMessage(text)),
    subscribeToMessages: () => dispatch(subscribeToMessages()),
    subscribeToMessage: () => dispatch(subscribeToMessage())
});
export default connect(mapStateToProps, mapDispatchToProps)(AuthComponent);
