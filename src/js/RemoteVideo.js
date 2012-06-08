ns("callme");

callme.RemoteVideo = function(){

    var that = this;
    var _private = {

        peerConnectionCreated: function(candidate){
            callme.utils.dir(candidate);
        },

        peerConnectionCreationFailed: function(){

        },

        gotDescription: function(description){

        }



    };

    this._ = function(){return _private};


}

callme.RemoteVideo.prototype.init = function(element){

    this._().element = element;

};

callme.RemoteVideo.prototype.answerSdp = function(sdp, localStream){

    var sd = new SessionDescription(unescape(sdp));

    callme.utils.dir(sd);
    callme.utils.dir(sd.toSdp());

    this.answer(sd);

}

callme.RemoteVideo.prototype.answer = function(description, localStream){

    try
    {
        var rc = callme.utils.createPeerConnection(this._().peerConnectionCreated,
            this._().peerConnectionCreationFailed);


        this._().remoteConnection = rc;

        if (localStream)
            rc.addStream(localStream);

        rc.setRemoteDescription("offer", description);

        rc.onaddstream = function (evt)
        {
            this._().element.src = callme.utils.URL().createObjectURL(evt.stream)
        };

       rc.createAnswer(rc.remoteDescription, function(description){
           rc.setLocalDescription("offer",description);
       });

    }
    catch (e)
    {
        callme.utils.log("Could not create or connect peer connection");
    }


}

callme.RemoteVideo.prototype.call = function(localStream){

    try
    {
        var rc = callme.utils.createPeerConnection(this._().peerConnectionCreated,
                    this._().peerConnectionCreationFailed);

        this._().remoteConnection = rc;

        rc.addStream(localStream);

        rc.onaddstream = function (evt)
        {
            this._().element.src = callme.utils.URL().createObjectURL(evt.stream)
        };

        var offer = rc.createOffer(function(description){
            rc.setLocalDescription("offer",description);
        });

        //we want to push this offer to the other side (which might mean putting it in an url?)
//        callme.utils.dir(offer);
//        callme.utils.dir(offer.toSdp());

        var sdp = offer.toSdp();
        var url = escape(sdp);

//        var sd = new SessionDescription(unescape(url));

        callme.utils.dir(url);

//        this.answer(offer);

        return window.location.href+"?"+url;

    }
    catch (e)
    {
        callme.utils.log("Could not create or connect peer connection");

        return null;
    }

};
