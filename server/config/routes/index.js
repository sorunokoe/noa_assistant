'use strict';

var config = require('../index');

module.exports = function(app){
    app.get('/', function(req, res) {
        res.render('index', {
            title: "Noa Assistant",
            description: "Noa - assistant that helps in daily life",
            keywords: "Noa, assistant, chat",
            author: config.author,
            app_name: config.app_name
        });
    });
    app.use(function(req, res, next){
        res.status(404);
        res.render('404');
    });
    app.use(function(err, req, res, next){
        console.error(err.stack);
        res.status(500);
        res.render('500');
    });
};