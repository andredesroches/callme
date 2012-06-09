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

    var sd = new SessionDescription(sdp);

    callme.utils.dir(sd);
    callme.utils.dir(sd.toSdp());

    this.answer(sd, localStream);

}

callme.RemoteVideo.prototype.answer = function(description, localStream){

    try
    {
        var rc = this._().remoteConnection;
        if (!rc)
        {
            var rc = callme.utils.createPeerConnection(this._().peerConnectionCreated,
                this._().peerConnectionCreationFailed);
            this._().remoteConnection = rc;
        }

        if (localStream)
            rc.addStream(localStream);

        var that = this;

        rc.onaddstream = function (evt)
        {
            callme.utils.log("got addstream event");
            that._().element.src = callme.utils.URL().createObjectURL(evt.stream);
            that._().element.play();
        };


//


        rc.setRemoteDescription(rc.SDP_OFFER, description);

        //these APIs are weird, might want to abstract everything out
        var answer = rc.createAnswer(description.toSdp());

        callme.utils.dir(answer.toSdp());

        rc.setLocalDescription(rc.SDP_ANSWER, answer);


        return answer;

//       rc.createAnswer(description.toSdp());, function(description){

//       });

    }
    catch (e)
    {
        callme.utils.log("Could not create or connect peer connection");
    }


}

callme.RemoteVideo.prototype.acknowledgeAnswer = function(answer){

    try
    {
        var rc = this._().remoteConnection;
        rc.setRemoteDescription(rc.SDP_ANSWER, answer);
    }
    catch (e)
    {
        callme.utils.log("Could not answer offer");
    }

};

callme.RemoteVideo.prototype.call = function(localStream){

    try
    {
        var rc = this._().remoteConnection;
        if (!rc)
        {
            var rc = new webkitDeprecatedPeerConnection("NONE", onSignalling);
            this._().remoteConnection = rc;
        }




        var that = this;

        rc.onaddstream = function (evt)
        {
            that._().element.src = callme.utils.URL().createObjectURL(evt.stream)
            that._().element.play();
        };



        function onSignalling(signal)
        {
            if (signal.indexOf("ANSWER")===-1)
            {
                var answer = callme.utils.getLoopBackAnswer(signal)
            }


        }

        rc.addStream(localStream);
//        var url = escape(sdp);

//        var sd = new SessionDescription(unescape(url));

//        callme.utils.log(url);

//        this.answer(offer);



        return offer;//window.location.href+"?sdp="+url;



    }
    catch (e)
    {
        callme.utils.log("Could not create or connect peer connection");

        return null;
    }

};
