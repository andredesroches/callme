$(document).ready(function(){

(function(){

    var myAddr = Math.round(Math.random()*1000);

    var theirAddr = callme.utils.getParameterByName("callerAddr");

    var signalingSocket = new callme.WebSocketApi(myAddr, "ws://127.0.0.1:1337", function(message){
        if (message.data.type=="offer")
        {
            theirAddr = message.sender;

            var answer =  remoteVideo.answer(new SessionDescription(message.data.sdp), localVideo.getStream());

            signalingSocket.send(theirAddr, {type:"answer",sdp:answer.toSdp()});
        }
        else if (message.data.type =="answer")
        {
            remoteVideo.acknowledgeAnswer(new SessionDescription(message.data.sdp));
        }
    });

    var localVideo = new callme.LocalVideo();

    var remoteVideo = new callme.RemoteVideo();

    function gotLocalVideo(stream){
        if (theirAddr)
        {
            var offer = remoteVideo.call(localVideo.getStream());

//            var answerSdp = callme.utils.getLoopBackAnswer(offer.toSdp());
//
//            remoteVideo.answer(new SessionDescription(answerSdp));

            signalingSocket.send(theirAddr,{type:"offer", sdp:offer.toSdp()});

        }
        else
        {
            signalingSocket.send(null, null);//this is just to set up a connection
        }
    }

    var sdp = callme.utils.getParameterByName("sdp");

    localVideo.init(document.getElementById("userVideo"), gotLocalVideo);

    remoteVideo.init($("#remoteVideo")[0]);


//     gotLocalVideo(localVideo.getStream());

    var startBtn = $("#startBtn");
    var stopBtn = $("#stopBtn");
    var callBtn = $("#callBtn");
    var answerUrl = $("#answerUrl");

    startBtn.click(function (e) {
        localVideo.start();
        startBtn.each(function(){this.disabled = true;});
        stopBtn.each(function(){this.disabled = false;});
    });

    stopBtn.click(function (e) {
        localVideo.stop();
        startBtn.each(function(){this.disabled = false;})
        stopBtn.each(function(){this.disabled = true;})
    });

    callBtn.click(function(e){
//        var offer = remoteVideo.call(localVideo.getStream());

//        remoteVideo.call(localVideo.getStream());

        var url = window.location.href+"?callerAddr="+myAddr;

        if (url)
        {
            answerUrl.html(url);
            answerUrl.attr("href",url);
        }

    });



    window.answerSdp = function(sdp){

        remoteVideo.answerSdp(sdp, localVideo.getStream());




    }

})();

});
