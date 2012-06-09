var WebSocketServer = require('websocket').server;
var http = require('http');

var server = http.createServer(function(request, response) {
    // process HTTP request. Since we're writing just WebSockets server
    // we don't have to implement anything.
});
server.listen(1337, function() { });

// create the server
wsServer = new WebSocketServer({
    httpServer: server
});

var connectedClients = {};


// WebSocket server
wsServer.on('request', function(request) {

    console.log("got request");

    var connection = request.accept(null, request.origin);


    // This is the most important callback for us, we'll handle
    // all messages from users here.
    connection.on('message', function(message) {
        if (message.type === 'utf8') {

            processMessage(message.utf8Data, connection);


            // process WebSocket message
        }
    });

    connection.on('close', function(connection) {

        //TODO: loop through connected clients and delete this one

    });
});

function processMessage(message, connection){

    var obj = JSON.parse(message);

    if (connectedClients[obj.sender]===undefined)
    {
        connectedClients[obj.sender] = connection;
        console.log(obj.sender+" is now connected");
    }
    else{
        console.log(obj.sender+" connection added");
    }

    var out = connectedClients[obj.destination]

    if (out!==undefined)//TODO: queue otherwise?
    {
        out.sendUTF(JSON.stringify({sender:obj.sender, data:obj.data}));
    }
    else{
        console.log(obj.destination+" is not a recognized destination");
    }

}
