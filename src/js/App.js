ns("callme");

callme.App = function(){

    var that = this;

	var _private = {

        gotUserVideo: function(stream){

            that._().element.src = webkitURL.createObjectURL(stream);
            that._().element.play();

        },

        userMediaFailed: function()
        {
            alert("No can do user media");
        }

    };
	
	this._ = function(){return _private;};

	
}

callme.App.prototype = {
	
	init:function(element){

        this._().element = element;

        try
        {
            callme.utils.webRTCSupported(this._().gotUserVideo, this._().userMediaFailed);
        }
        catch (e){
            this._().userMediaFailed();
        }
		
	}



	
}
