'use strict';

var thinky = require('thinky')({
    host: 'localhost',
    port: 28015,
    db: "NoaDB"
});

module.exports = thinky;
