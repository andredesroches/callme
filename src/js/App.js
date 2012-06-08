$(document).ready(function(){

(function(){

    var localVideo = new callme.LocalVideo();

    var remoteVideo = new callme.RemoteVideo();

    localVideo.init(document.getElementById("userVideo"));

    remoteVideo.init($("#remoteVideo")[0]);

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
        var url = remoteVideo.call(localVideo.getStream());

        if (url)
        {
            answerUrl.html(url);
            answerUrl.attr("href",url);
        }

    })

    window.answerSdp = function(sdp){

        remoteVideo.answerSdp(sdp);




    }

})();

});
