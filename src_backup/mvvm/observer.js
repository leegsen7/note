// 全局转换函数
function transStr(str,data){
    var reg = /\<|\=\=|\>|\+|\-|\*|\//g,
        reg1 = /^-?[1-9]\d*|\'?\'|\"?\"$/;
        code = '',
        cursor = 0,
        match = '';

    str = str.replace(/(^\s+)|(\s+$)/g,"").replace(/\s/g,"");// 去空格
    while(match = reg.exec(str)){
        var str1 = str.slice(cursor,match.index);
        code += reg1.test(str1) ? str1 : 'this.'+str1;
        cursor = match.index + match[0].length;
        code += match[0];
        
    }
    var str2 = str.substr(cursor, str.length - cursor);
    code += reg1.test(str2) ? str2 : 'this.'+str2;

    return new Function("return "+code).apply(data)
}

function Observe(data) {
    this.data = data;
    this.beforeInt();
};

Observe.prototype = {
    constructor:Observe,
    beforeInt:function (){
        var data = this.data;
        if (!data || typeof data !== 'object') {
            return;
        }
        this.init();
    },
    init: function(){
        var data = this.data;
        // 取出所有属性遍历
        Object.keys(data).forEach(key => {
            this.defineReactive(data, key, data[key]);
        });
    },
    defineReactive: function(data,key,val){
        var dep = new Dep();
        new Observe(val); // 监听子属性

        Object.defineProperty(data, key, {
            enumerable: true, // 可枚举
            configurable: false, // 不能再define
            get: () => {
                if (Dep.target){
                    dep.depend();
                }
                return val;
            },
            set: newVal => {
                if (val === newVal) return;
                console.log('监听到值变化了 ', val, ' --> ', newVal);
                val = newVal;
                new Observe(newVal);
                dep.notify();
            }
        });
    }

}

var uid = 0;
function Dep() {
    this.subs = [];
    this.id = uid++; // 添加唯一值
}
Dep.prototype = {
    addSub: function(sub){
        this.subs.push(sub);
    },
    depend: function(){
        Dep.target.addDep(this);// 执行Watcher 里面的方法
    },
    notify: function(){
        console.log('发布者发布-----');
        this.subs.forEach(sub => {
            sub.update();// 执行Watcher 里面的方法
        });
    }
};
Dep.target = null;
