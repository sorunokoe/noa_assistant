var config = require('../../config');
var socket = require('socket.io');
var message = require('../message');

module.exports = function(app) {
    var io = socket(app);
    io.on('connection', function (socket) {
        console.log('made socket connetction');
        message.list(0, (messages) => {
            socket.emit('GET_MESSAGES', messages);
        });
        socket.on('POST_MESSAGE', function (data) {
            message.add(data, function(status){
                console.log(status);
            });
        });
        message.get(0, (message) => {
            var data = {
                text: message.text,
                type: message.type
            };
            socket.emit('RECEIVE_MESSAGE', data);
        })
    });
};