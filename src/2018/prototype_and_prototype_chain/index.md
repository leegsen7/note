## 原型和原型链

首先来看声明一个空数组`var arr = []`
<img src="1.png" width="80%" /><br>
可以看到这个arr变量上有一个length属性和一个__proto__(double underscore proto)属性<br>
我们知道Array的原型`Array.prototype`上有很多数组的方法
<img src="2.png" width="80%" /><br>
而`arr.push(1)`可以调用`Array.prototype`上的这些方法<br>
实际上`arr.__proto__ === Array.prototype // true`,`arr.push(1)`实际上调用的是`arr.__proto__.push`方法<br>
在js中,万物皆对象,每一个对象上都会有__proto__这个属性,那`Array.prototype.__proto__ === ?`是什么东西呢?
<img src="3.png" width="80%" /><br>
实际上`Array.prototype.__proto__ === Object.prototype // true`指向的是Object的原型<br>
而`Object.prototype.__proto__ === null // true`,Object.prototype就是万物的终点,再往前一步就是虚无了<br>
我们再回过头来看<br>
```javascript
arr.__proto__ === Array.prototype // true
Array.prototype.__proto__ === Object.prototype // true
arr.__proto__.__proto__ === Object.prototype // true
arr.__proto__.__proto__.__proto__ === null // true
```
一个对象沿着它的__proto__出发,到达一个又一个的__proto__,直到这个属性为null,这就是原型链.
<img src="4.png" width="80%" /><br>
当我们对一个对象使用`.`操作符调用一个属性时,先会在此对象上寻找此属性,如果找到则返回,如果找不到就会沿着原型链上去找,如果在原型链上都找不到的话则返回undefined<br>
下面测试一下,在arr对象上添加一个push方法<br>
<img src="5.png" width="80%" /><br>
可以看到
