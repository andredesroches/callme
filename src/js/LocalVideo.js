ns("callme");

callme.LocalVideo = function(){

    var that = this;

	var _private = {

        gotUserVideo: function(stream){


            that._().element.src = webkitURL.createObjectURL(stream);
            that._().element.play();

            that._().localStream = stream;

        },

        userMediaFailed: function()
        {
            alert("No can do user media");
        }

    };

	this._ = function(){return _private;};

	
}



callme.LocalVideo.prototype.init = function(element){

        this._().element = element;

        this.start();
		
};

callme.LocalVideo.prototype.start = function(){

    try
    {
        callme.utils.webRTCSupported(this._().gotUserVideo, this._().userMediaFailed);
    }
    catch (e){
        this._().userMediaFailed();
    }
}

callme.LocalVideo.prototype.stop = function(){

    if (this._().localStream)
        this._().localStream.stop();

    this._().element.src = "";

}

