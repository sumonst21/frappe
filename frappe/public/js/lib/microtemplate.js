// Simple JavaScript Templating
// Adapted from John Resig - http://ejohn.org/ - MIT Licensed
tmpl = {compiled: {}, debug:{}};
tmpl.compile = function(str) {
	if(str.indexOf("'")!==-1) {
		console.log("Warning: Single quotes (') may not work in templates");
	}
	if(!tmpl.compiled[str]) {
		fn_str = "var p=[],print=function(){try{p.push.apply(p,arguments)}catch(e){console.log([p, e]);};};" +

	        // Introduce the data as local variables using with(){}
	        "with(obj){p.push('" +

	        // Convert the template into pure JavaScript
	        str
	          .replace(/[\r\t\n]/g, " ")
	          .split("{%").join("\t")
	          .replace(/((^|%})[^\t]*)'/g, "$1\r")
	          .replace(/\t=(.*?)%}/g, "',$1,'")
	          .split("\t").join("');")
	          .split("%}").join("p.push('")
	          .split("\r").join("\\'")
	      + "');}return p.join('');";

  		tmpl.debug[str] = fn_str;
		tmpl.compiled[str] = new Function("obj", fn_str);
    }

	return tmpl.compiled[str];
};
tmpl.render = function(str, data, debug) {
	return tmpl.compile(str)(data);
};
