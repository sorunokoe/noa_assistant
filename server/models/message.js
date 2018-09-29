'use strict';

var thinky = require("../config/rethinkdb");

var Message = thinky.createModel('Message', {
    text: String,
    type: String,
    date: { _type: Date, default: thinky.r.now()}
});

Message.ensureIndex('date');

module.exports = Message;