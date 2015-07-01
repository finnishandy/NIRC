/**
 * Created by Finnishandy on 19/04/15.
 */
net = require('net');

// Keep track of the chat clients
var clients = [];

var nixClient = net.createConnection('/tmp/onesocket');
nixClient.on('connect', function() {
    console.log('connected to unix socket server');
    //socket.write("woo");
});

nixClient.on('data', function(data) {
    console.log('got data from unix socket server');
    console.log(data.toString());
    broadcast(data);
});

// Start a TCP Server
net.createServer(function (socket) {

    // Identify this client
    socket.name = socket.remoteAddress + ":" + socket.remotePort

    // Put this new client in the list
    clients.push(socket);

    // Send a nice welcome message and announce
    socket.write("Welcome " + socket.name + "\n");
    broadcast(socket.name + " joined the chat\n", socket);

    // Handle incoming messages from clients.
    socket.on('data', function (data) {
        //broadcast(socket.name + "> " + data, socket);
        nixClient.write(data);
    });

    // Remove the client from the list when it leaves
    socket.on('end', function () {
        clients.splice(clients.indexOf(socket), 1);
        broadcast(socket.name + " left the chat.\n");
    });



}).listen(6667);

// Send a message to all clients
function broadcast(message, sender) {
    clients.forEach(function (client) {
        // Don't want to send it to sender
        //if (client === sender) return;
        client.write(message);
    });
    // Log it to the server output too
    process.stdout.write(message)
}

// Put a friendly message on the terminal of the server.
console.log("Chat server running at port 6667\n");
