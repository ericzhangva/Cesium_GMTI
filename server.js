(function () {

    var connect = require('connect');
    var ws = require("nodejs-websocket")

    connect.createServer()
        .use(connect.logger('dev'))
        .use(connect.static(__dirname))
        .listen(8088);


}())


