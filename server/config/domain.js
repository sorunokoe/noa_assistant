"use strict";

module.exports = function(app){
    app.use(function(req, res, next){
        var domain = require('domain').create();
        domain.on('error', function(err){
            console.error('INTERCEPTION DOMAIN ERROR\n', err.stack);
            try {
                setTimeout(function(){
                    console.error('SAFE STOP');
                    process.exit(1);
                }, 5000);
                var worker = require('cluster').worker;
                if(worker) worker.disconnect();
                server.close();
                try {
                    next(err);
                } catch(err){
                    console.error('Failures of error-handling mechanism ' +
                        'Express .\n', err.stack);
                    res.statusCode = 500;
                    res.setHeader('content-type', 'text/plain');
                    res.end('Server Error');
                }
            } catch(err){
                console.error('CANNOT SEND RESPONSE - 500.\n', err.stack);
            }
        });
        domain.add(req);
        domain.add(res);
        domain.run(next);
    });
}