### 实现一个LazyMan，可以按照以下方式调用

+ LazyMan(“Hank”)输出
	```javascrip
	Hi! This is Hank!
	```

+ LazyMan(“Hank”).sleep(10).eat(“dinner”)输出
	```javascrip
	Hi! This is Hank!
	等待10秒..
	// Wake up after 10
	Eat dinner~
	```

+ LazyMan(“Hank”).eat(“dinner”).eat(“supper”)输出
	```javascrip
	Hi This is Hank!
	Eat dinner~
	Eat supper~
	```

+ LazyMan(“Hank”).sleepFirst(5).eat(“supper”)输出
	```javascrip
	等待5秒
	// Wake up after 5
	Hi This is Hank!
	Eat supper
	```

1. 分析需要实现的点
	- 链式调用功能，可以参考jQuery和Promise的实现原理
	- sleepFirst，优先延迟功能；sleep延迟功能呢

2. 实现类
```javascript
// 定义原型函数，在函数中返回this实现链式调用
class LazyManClass {
    constructor(name) {
        this.name = name
    }
    sleepFirst(time) {
        return this
    }
    sleep(time) {
        return this
    }
    eat(str) {
        return this
    }
}
// 实例化调用
const LazyMan = name => new LazyManClass(name)
LazyMan('lee').sleep(2).eat('apple')
```
用一个数组去收集数据,异步执行收集到的每一个函数，源码见[这里](./index.js)