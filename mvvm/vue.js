(function(window){
	var Vue = function(){
		function Vue(options){
			this.$options = options;
			var data = this.$data = this.$options.data();
		}
	}

	window.Vue = Vue;
})(window);

