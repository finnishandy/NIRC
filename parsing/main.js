/**
 * Created by Sakari.Ruoho on 20/04/2015.
 */
/***
 * The main purpose of the IRC protocol is to provide a base for clients to communicate with each other.
 * PRIVMSG SQUERY and NOTICE are the only messages available which actually perform delivery of a text message
 * from one client to another - the rest just make it possible and try to ensure it happens in a
 * reliable and structured manner.
 */
var parser = require("./message-parser"), ircMessage = "";

process.argv.forEach(function (val, index, array) {
    if (index > 1) ircMessage += val + " ";
});

var parsedMessage = parser.parseMessage(ircMessage);
console.log("prefix: " + parsedMessage.prefix);
console.log("command: " + parsedMessage.command);
console.log("params: " + parsedMessage.params.join());
console.log("trailing: " + parsedMessage.trailing);