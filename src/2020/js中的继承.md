### 1. 类式继承
```javascript
// 声明父类
function SuperClass() {
    this.bookList = ['a','b','c']
}
// 声明子类
function SubClass() {}
// 继承父类
SubClass.prototype = new SuperClass()
var instance1 = new SubClass()
var instance2 = new SubClass()

instance2.bookList // ['a','b','c']
instance1.bookList.push('d')
instance2.bookList // ['a','b','c','d']
```
#### 缺点: 
1. 子类的实例会修改父类的属性
2. 实例化时无法传参
 

### 2. 构造函数式继承
```javascript
// 声明父类
function SuperClass(id) {
    this.bookList = ['a','b','c']
    this.id = id
}
// 父类原型方法
SuperClass.prototype.showBook = function() {
    return this.bookList
}
// 声明子类
function SubClass(id) {
    // 继承父类
    SuperClass.call(this, id)
}

var instance1 = new SubClass(1)
instance1.showBook // undefined
```
#### 缺点: 
1. 没有涉及到原型,无法继承父类的原型方法

### 3. 组合式继承
```javascript
// 声明父类
function SuperClass(id) {
    this.bookList = ['a','b','c']
    this.id = id
}
// 声明子类
function SubClass(id) {
    // 构造函数式继承
    SuperClass.call(this, id)
}
// 类式继承
SubClass.prototype = new SuperClass()

var instance1 = new SubClass(1)
var instance2 = new SubClass(2)
```
#### 缺点: 
1. 子类实例化的时候调用了两遍父类构造函数


### 4. 寄生组合式继承
```javascript
// 声明父类
function SuperClass(id) {
    this.bookList = ['a','b','c']
    this.id = id
}
// 声明子类
function SubClass(id) {
    // 构造函数式继承
    SuperClass.call(this, id)
}
// 类式继承
SubClass.prototype = Object.create(SuperClass.prototype)
SubClass.constructor = SubClass

var instance1 = new SubClass(1)
var instance2 = new SubClass(2)
```
