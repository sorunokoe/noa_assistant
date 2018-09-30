"use strict";

var express = require('express');
var compression = require("compression");
var helmet = require("helmet");
var morgan = require("morgan");
var cors = require("cors");
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var config = require('./config');
var routes = require('./config/routes');
var socket = require("./controllers/socket")

var app = express();
app.set('views', __dirname+'/views')
app.set('view engine', 'jade');
app.set('view cache', true);
app.enable('trust proxy');
app.use(morgan("common"));
app.use(helmet());
app.use(cors());
app.use(compression());

require('./config/domain')(app)
require('./config/cluster')(app)

app.use(cookieParser(config.cookieSecret));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(compression());

app.set('port', process.env.PORT || config.ports.http);
app.use(express.static(__dirname + './../client/public'));

routes(app);

switch(app.get('env')){
    case 'development':
        app.use(morgan('dev'));
        break;
    case 'production':
        app.use(require('express-logger')({
            path: __dirname + '/log/requests.log'
        }));
        break;
}

function startServer() {
    var server = app.listen(app.get('port'), function() {
        // console.log('Mode ' + app.get('env') + ' ' + config.host + ' ' + app.get('port'));
    });
    socket(server)
    return server
}
if(require.main === module){
    startServer();
} else {
    module.exports = startServer();
}
