'use strict';
var thinky = require("../config/rethinkdb");
var Message = require('../models/message');

exports.list = (pk, callback) => {
    Message
        .orderBy({ index: thinky.r.asc('date') })
        .run()
        .then(function(messages){
            callback(messages);
        });
};
exports.get = (pk, callback) => {
    Message
        .changes()
        .then(function(cursor){
            cursor.each((err, message) => {
                callback(message)
            });
        });
};
exports.add = (data, callback) => {
    var message = new Message(data);
    message.save()
        .then(function(result){
            callback(result);
        })
        .error(function(error){
            callback(error);
        })
};

