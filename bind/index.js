x = 'cba';

var foo = {
	x:'abc',
	y:function(){
		return this.x + '+first';
	}
}
var y1 = foo.y;
var y2 = foo.y.bind(foo);

console.log(foo.y()); // abc+first
console.log(y1());// cba+first
console.log(y2());// abc+first
