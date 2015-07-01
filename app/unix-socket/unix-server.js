/**
 * Created by Finnishandy on 19/04/15.
 */
var net = require('net'),
    fs = require('fs');

var path = '/tmp/onesocket';
var sockets = [];

// This server listens on a Unix socket at /var/run/mysocket
var unixServer = net.createServer(function(socket) {

    sockets.push(socket)
    // Do something with the client connection
    //socket.pipe(socket);

    socket.on('data', function(data){
        console.log("server got data.");
        for (var i = 0; i < sockets.length; i++) {
            sockets[i].write(data.toString().toUpperCase());
        }

        //socket.broadcast
    });
});

unixServer.on('error', function (e) {
    if (e.code == 'EADDRINUSE') {
        var clientSocket = new net.Socket();
        clientSocket.on('error', function(e) { // handle error trying to talk to server
            if (e.code == 'ECONNREFUSED') {  // No other server listening
                fs.unlinkSync('/tmp/app-monitor.sock');
                server.listen('/tmp/app-monitor.sock', function() { //'listening' listener
                    console.log('server recovered');
                });
            }
        });
        clientSocket.connect({path: '/tmp/app-monitor.sock'}, function() {
            console.log('Server running, giving up...');
            process.exit();
        });
    }
});

unixServer.listen(path);

