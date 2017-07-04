function Watcher(vm,exp,cb){
	this.vm = vm;
	this.exp = exp;
	this.cb = cb;
	this.depIds = {};
	this.value = this.get();
}

Watcher.prototype = {
	constructor:Watcher,
	// observer setter 更新
	update:function(){
		var oldVal = this.value,
			newVal = this.get();
		if (oldVal !== newVal){ // 值发生改变就赋值回调
			this.value = newVal;
			this.cb.call(this.vm,newVal,oldVal);
		}
	},
	// observer getter 执行
	addDep: function (dep){
		// 没有这个id属性，说明是新的属性
		if (!this.hasOwnProperty(dep.id)){
			dep.addSub(this);// 添加到订阅者数组中
			this.depIds[dep.id] = dep;
		}
	},
	get:function(){
		Dep.target = this;
		var value = this.getVMVal();
		Dep.target = null;
		return value;
	},
	getVMVal:function(){
		var data = this.vm.$data,
			exp = this.exp;

		return transStr(exp,data);
	}
}