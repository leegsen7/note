function Observer() {
	this.arrs = [];
}

Observer.prototype = {
	subscribe: function(arr) {
		this.arrs.push(arr);
	},
	unsubscribe: function(arr){
		this.arrs = this.arrs.filter(el => {
			if (el !== arr){
				return el;
			}
		})
	},
	publish: function(o,thisObj){
		let scope = thisObj || global;
		this.arrs.forEach(el => {
			el.call(scope, o);
		})
	},
	get:function(){
		return this.arrs;
	}
}

var observer = new Observer();

var f1 = data => {
	console.log('系统:'+data+'进来了');
}

observer.subscribe(f1);
observer.publish('liguisheng');

console.log(observer.get());