## 实现new操作符

#### 父类Man
```javascript
function Man(name) {
  this.name = name
  if (typeof name !== 'string') {
    return 1
  }
  if (name !== 'leegsen') {
    return {
      name: 'invalidName',
    }
  }
}
Man.prototype.getName = function () {
  return this.name
}
```
#### 实现selfNew函数
```javascript
const selfNew = (instance, ...args) => {
  // 创造原型对象
  const thisValue = Object.create(instance.prototype)
  // 在thisValue上执行函数
  const result = instance.apply(thisValue, args)
  // new操作符会根据函数的返回值返回不一样的类型
  // 1、返回执行结果
  if (typeof result === 'object' && result !== null) {
    return result
  }
  // 2、返回原型对象
  return thisValue
}
```
#### 用例测试
```javascript
const man00 = new Man('leegsen')
const man01 = selfNew(Man, 'leegsen')
man00.name === man01.name // true: leegsen
man00.getName() === man01.getName() // true: leegsen
man00 instanceof Man // true
man01 instanceof Man // true

const man10 = new Man('Mark')
const man11 = selfNew(Man, 'Mark')
man00.name === man01.name // true: invalidName
man00.getName === man01.getName // true: undefined

const man20 = new Man(2)
const man21 = selfNew(Man, 2)
man00.name === man01.name // true: 2
man00.getName() === man01.getName() // true: 2
```
#### 拓展
可以在父类上增加检测，阻止非实例化调用，例如`const man = Man('leegsen')`
```javascript
function Man(name) {
  if (!(this instanceof Man)) {
    throw Error('Cannot call a class as a function')
  }
  this.name = name
  if (typeof name !== 'string') {
    return 1
  }
  if (name !== 'leegsen') {
    return {
      name: 'invalidName',
    }
  }
}
Man.prototype.getName = function () {
  return this.name
}
```
