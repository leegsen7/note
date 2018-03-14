let str = "Hello, my name is ${user.name}. I\'m ${age} years old.";

function TemplateEngine(str,data){
	let reg = /\${([^\}]+)?\}/g,
        code = 'var r=[];\n',
        cursor = 0;
    var add = function(line,flag){
    	flag ? code += 'r.push(this.' + line + ');\n' : code += 'r.push("' + line.replace(/"/g, '\\"') + '");\n';
    }
	while(match = reg.exec(str)) {
	    add(str.slice(cursor, match.index));
	    add(match[1], true); 
	    cursor = match.index + match[0].length;
	}
    add(str.substr(cursor, str.length - cursor));
    code += 'return r.join("");';
    	
	return new Function(code).apply(data);
}

console.log(TemplateEngine(str,{
	user:{
		name:"li",
	},
	age:21
}));