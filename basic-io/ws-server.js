/**
 * Created by Sakari.Ruoho on 14/04/2015.
 */
var http = require('http'),
    parser = require('../parsing/message-parser.js');

var server = http.createServer(function(request, response) {});

server.listen(3333, function() {
    console.log("Server listening on port 3333.");
});

var net = require('net');
var unixSocket = net.createConnection('/tmp/onesocket');
unixSocket.on('connect', function() {
    console.log('connected to unix socket server');
    unixSocket.write("woo");
});

unixSocket.on('data', function(data) {
    console.log('GOT DATA FROM UNIX SOCKET SERVER');
    console.log(data.toString());
});

var io = require("socket.io")(server);

var handleClient = function (socket) {
    // we've got a client connection
    socket.on("message", function(data){
        console.log(JSON.stringify(parser.parseMessage(data)));
        //socket.emit("message", data);
        unixSocket.write("woo");
        // Route
    });
    //console.log("handle client");
    //socket.emit("message", {user: "nodesource", text: "Hello, world!"});
};

io.on("connection", handleClient);
