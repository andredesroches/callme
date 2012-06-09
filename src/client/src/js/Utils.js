function ns(namespace, obj)
{
	var arr = namespace.split(".");
	
	if (!obj)
		obj = window;

	var name = arr.shift();	

	if (obj[name]===undefined)
		obj[name] = {};


	if (arr.length==0)
		return;
	else
	{
		ns(arr.join("."),obj[name]);
	}

}

ns("callme.utils");

//throws error if fail
callme.utils.webRTCSupported = function(callback, errorCallback){

    //TODO: try mozilla version if no webkit...
    //also, support "video,audio" syntax...
    if(navigator.webkitGetUserMedia)
    {

        navigator.webkitGetUserMedia({video:true,audio:true}, callback, errorCallback);

    }
    else
    {
        throw new Error("WebRTC is not supported")
    }



}

callme.utils.createPeerConnection = function(successCallback, failCallback, config){

    var possibleDefs = ["PeerConnection",
                        "webkitPeerConnection","webkitPeerConnection00","webkitDeprecatedPeerConnection"];



    if (!config)
        config = "NONE";

    var classDef;

    var len = possibleDefs.length;
    var i = 0;
    for (;i<len;i++)
    {
        if (window[possibleDefs[i]])
        {
            classDef = possibleDefs[i];
            break;
        }
    }

    if (!classDef)
    {
        //error out
        alert("No PeerConnection support in this browser");
    }

    return new window[classDef](config, successCallback, failCallback);


}

callme.utils.URL = function()
{

    if (window.URL)
        return URL;
    else if (window.webkitURL)
        return webkitURL;

}

callme.utils.log = function(str)
{
    if (window.console)
        console.log(str);
}

callme.utils.dir = function(str)
{
    if (window.console)
        console.dir(str);
}

callme.utils.getParameterByName = function(name)
{
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regexS = "[\\?&]" + name + "=([^&#]*)";
    var regex = new RegExp(regexS);
    var results = regex.exec(window.location.search);
    if(results == null)
        return "";
    else
        return decodeURIComponent(results[1].replace(/\+/g, " "));
}

callme.utils.getLoopBackAnswer = function(data){
    if (data.search("OFFER") != -1) {
        // In loopback mode, replace the ROAP OFFER with ROAP ANSWER.
        data = data.replace("OFFER", "ANSWER");
        // Keep only the first crypto line for each m line in the answer.
        var mlines = data.split("m=");
        // Start from 1 because the first item in the array is not a m line.
        for (var i = 1; i < mlines.length; ++i) {
            var mline = mlines[i];
            var cryptoBegin = mline.indexOf("a=crypto:", 0);
            if (cryptoBegin == -1) {
                // No crypto line found.
                continue;
            }
            // Skip the first crypto line.
            cryptoBegin = mline.indexOf("a=crypto:", cryptoBegin + 1);
            while (cryptoBegin != -1) {
                var cryptoEnd = mline.indexOf("\\n", cryptoBegin);
                var crypto = mline.substring(cryptoBegin, cryptoEnd + 2);
                data = data.replace(crypto, "");
                // Search for the the next crypto line.
                cryptoBegin = mline.indexOf("a=crypto:", cryptoBegin + 1);
            }
        }
        var lines = data.split("\n");
        for (var i = 0; i < lines.length; ++i) {
            // Look for the offererSessionId and use it as answererSessionId
            if (lines[i].length > 0 && lines[i].search("offererSessionId") != -1) {
                var answer_session_id =
                    lines[i].replace("offererSessionId", "answererSessionId");
                answer_session_id += "\n" + lines[i];
                data = data.replace(lines[i], answer_session_id);
            }
        }

        return data;
    }
    return null;
}

