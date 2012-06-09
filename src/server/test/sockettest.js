var SERVER = "ws://127.0.0.1:1337";

var socket = new WebSocket(SERVER);



$(document).ready(function(){

    socket.onopen = function () {
        // connection is opened and ready to use
    };

    socket.onerror = function (error) {
        // an error occurred when sending/receiving data
    };

    socket.onmessage = function (message) {
        // try to decode json (I assume that each message from server is json)
        try {
            var json = JSON.parse(message.data);
        } catch (e) {
            console.log('This doesn\'t look like a valid JSON: ', message.data);
            return;
        }
        // handle incoming message
    };

    $("#send").click(function(){

        var ip = $("#input")[0];

        var txt = ip.value;

        socket.send(txt);

    });

//    socket.send("started");


});
