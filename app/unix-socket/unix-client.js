/**
 * Created by Finnishandy on 19/04/15.
 */
var net = require('net');
var socket = net.createConnection('/tmp/onesocket');
socket.on('connect', function() {
    console.log('connected to unix socket server');
    socket.write("woo");
});

socket.on('data', function(data) {
    console.log('GOT DATA FROM UNIX SOCKET SERVER');
    console.log(data.toString());
});
