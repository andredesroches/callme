function ns(namespace, obj)
{
	var arr = namespace.split(".");
	
	if (!obj)
		obj = window;

	var name = arr.shift();	

	if (obj[name]===undefined)
		obj[name] = {};
	else
	{
		throw new Error("The namespace"+namespace+" clashes with an existing one on it's parent object.");
	}
		
	if (arr.length==0)
		return;
	else
	{
		ns(arr.splice("."),obj[name]);
	}

}
