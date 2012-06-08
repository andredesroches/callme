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
