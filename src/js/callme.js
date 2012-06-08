ns("callme");

callme.App = function(){
	
	var _private = {};
	
	this._ = function(){return _private;};

	
}

callme.App.prototype = {
	
	init:function(){
		
		this._().foo = "bar";
		
		alert(this._().foo);
		
	}
	
}
