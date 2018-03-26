let str = "Hello, my name is ${user.name}. I\'m ${age} years old.";
let data = {
    user:{
        name:"li",
    },
    age:21
}

function TemplateEngine(str,data){
	let reg = /\${([^\}]+)?\}/g
    let code = 'var r=[];\n'
    let cursor = 0
    let match = null
    var add = function(line,flag){
    	flag ? code += 'r.push(this.' + line + ');\n' : code += 'r.push("' + line.replace(/"/g, '\\"') + '");\n';
    }
	while((match = reg.exec(str)) !== null) {
	    add(str.slice(cursor, match.index));
	    add(match[1], true);
	    cursor = match.index + match[0].length;
	}
    add(str.substr(cursor, str.length - cursor));
    code += 'return r.join("");';

    // console.log(code)
    // var r=[];
    // r.push("Hello, my name is ");
    // r.push(this.user.name);
    // r.push(". I'm ");
    // r.push(this.age);
    // r.push(" years old.");
    // return r.join("");

	return new Function(code).apply(data);
}

let res_0 = TemplateEngine(str,data)
console.log(res_0)


let StringTemplate = (str,data) => str.replace(/\${([^\}]+)?\}/g,(val,p1) => new Function('return this.' + p1).call(data))

let res_1 = StringTemplate(str,data)

console.log(res_1)