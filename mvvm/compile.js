function Compile(el,vm){
	this.$vm = vm;
	this.$el = this.isElementNode(el) ? el : document.querySelector(el);
	this.init(this.$el);
}

Compile.prototype = {
	construtor:Compile,
	init:function(el){
		if (el){
			var fragment = this.node2Fragment(el);
			this.compileElement(fragment);
			this.$el.appendChild(fragment);
		}
	},
	// 文档碎片拷贝
	node2Fragment: el => {
        var fragment = document.createDocumentFragment(),
            child;

        while(child = el.firstChild){
        	fragment.appendChild(child);
        }

        return fragment;
	},
	compileElement:function(el){
		var child = el.childNodes;
		var reg = /\{\{(.*)\}\}/;
		for (let key of child){
			// 编译指令
			if (this.isElementNode(key)){
				this.compile(key);
			}
			// 编译{{}}
			else if (this.isTextNode(key) && reg.test(key.textContent)){
				this.compileText(key);
			}
			// 子节点编译
			if (key.childNodes && key.childNodes.length){
				this.compileElement(key);
			}
		}
	},
	compile:function (node){
		var nodeAttrs = node.attributes;
		[...nodeAttrs].forEach( key => {
			let name = key.nodeName,
				val = key.nodeValue;
			// v- 指令
			if (this.isDirective(name)){
				let dir = name.substring(2);
				if (dir == 'model'){
					compileUtil.model(node,this.$vm,val);
				}
				else {
					compileUtil.bind(node,this.$vm,val,dir);
				}
				node.removeAttribute(name);
			}
			// @ 事件指令
			if (this.isEventDirective(name)){
				let event = name.substring(1);
				compileUtil.eventHandler(node,this.$vm,val,event);
				node.removeAttribute(name);
			}
		})
	},
	compileText:function(node){
		console.dir(node);
	},
	isElementNode: el => {
		return el.nodeType === 1;
	},
	isTextNode: el => {
		return el.nodeType === 3;
	},
	isDirective: attr => {
		return attr.indexOf('v-') === 0;
	},
	isEventDirective: attr => {
		return attr.indexOf('@') === 0;
	}
}

// 指令处理集合
var compileUtil = {
    model: function(node, vm, val) {
        this.bind(node, vm, val, 'model');

		var cpLock = false,
			self = this;

        node.addEventListener('compositionstart', function(){
            cpLock = true;
        })
        node.addEventListener('input',Func);
        node.addEventListener('compositionend', function(e){
            cpLock = false;
            Func(e);
        })

        function Func(e){
            if (!(cpLock === true)){
                var newValue = e.target.value;
                self.setVMVal(vm, val, newValue);
            }
        }
    },
    bind:function(node,vm,val,dir){
    	var value = this.getVMVal(vm,val);
    	this.dirHandler(node,value,dir);
    	// 实例化对象 回调
    	new Watcher(vm,val,(newVal,oldVal) =>{
    		this.dirHandler(node,newVal,dir,oldVal);
    	})
    },
    eventHandler:function(node,vm,val,event){
    	var fn = vm.$options.methods && vm.$options.methods[val];
    	if (fn && event){
    		// 绑定@函数
    		node.addEventListener(event,fn.bind(vm));
    	}
    },
    dirHandler:function(node,val,type,oldVal){
    	switch (type){
    		case "text":
    			node.innerText = val || '';
    			break;
    		case "html":
    			node.innerHTML = val || '';
    			break;
    		case "show":
    			if (typeof val == 'undefined'){
    				node.style.display = '';
    			}
    			else {
    				node.style.display = val ? '' : "none";
    			}
    			break;
    		case "hide":
    			if (typeof val == 'undefined'){
    				node.style.display = '';
    			}
    			else {
    				node.style.display = val ? 'none' : "";
    			}
    			break;
    		case "model":
    			node.value = val || '';
    			break;

			case "class":

				break;
    	}
    },
    setVMVal:function(vm, val, newValue){
    	var data = vm.$data;
    	new Function("this."+val+"=\'"+newValue+"\'").apply(data);
    },
    getVMVal:function(vm,val){
    	var data = vm.$data;

		return transStr(val,data);
    }
}


