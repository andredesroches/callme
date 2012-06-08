ns("callme");

callme.RemoteVideo = function(){

    var that = this;
    var _private = {

    };

    this._ = function(){return _private};


}

callme.RemoteVideo.prototype.init = function(element){

    this._().element = element;

};
