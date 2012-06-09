callme.WebSocketApi = function(srcaddr, server, onMessage){

    var that = this;
    var _private = {

        onMessage:function(json){
            var obj = JSON.parse(json.data);
            that._().messageCallback(obj);
        }

    };


    this._ = function(){
        return _private;


    }

    this.init.apply(this,arguments);

}

callme.WebSocketApi.prototype = {

    init:function(srcaddr, server, onMessage){

        this._().srcAddr = srcaddr;

        var socket = new WebSocket(server);

        socket.onmessage = this._().onMessage;


        this._().messageCallback = onMessage;

        this._().socket = socket;

    },

    send:function(dest, message){



        var payload = {destination:dest, data:message, sender:this._().srcAddr};

        var jsonString = JSON.stringify(payload);

        this._().socket.send(jsonString);

    }




}


