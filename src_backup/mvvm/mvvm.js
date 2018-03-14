function Vue(options){
	this.$options = options;
	var data = this.$data = options.data();

	new Observe(data);

	new Compile(options.el || document.body,this);
}