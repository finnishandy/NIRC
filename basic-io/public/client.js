/**
 * Created by Sakari.Ruoho on 20/04/2015.
 */
var socket = io.connect("http://localhost:3333");
socket.on("connect", function () {
    console.log("Connected!");
});
socket.on("message", function (message) {
    console.log("message" + JSON.stringify(message));
});

$("#submit").click(function(event){
    event.preventDefault();
    socket.emit("message", "PRIVMSG #nsb_radio :" + $("#message").val());
});