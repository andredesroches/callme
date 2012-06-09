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
