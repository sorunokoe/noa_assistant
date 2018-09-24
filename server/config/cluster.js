"use strict";
var cluster = require('cluster');

module.exports = function(app){
    app.use(function(req,res,next){
        if (cluster.isWorker) {
            console.log('Worker %d get request', cluster.worker.id);
        }
        next();
    });
}


