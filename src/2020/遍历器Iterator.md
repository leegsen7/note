### 遍历器Iterator

#### 抛出问题
哪些数据类型可以被for of遍历？

#### 背景
在ES6中有多种数据结构，包括有数组（Array）、对象（Object）、字符串（String）、Map和Set。

遍历器Iterator是一个接口机制，为各种不同的数据结构提供统一的访问机制，任何数据结构只要部署 Iterator 接口，就可以完成遍历操作。

Iterator 的遍历过程是这样的。
1. 创建一个指针对象，指向当前数据结构的起始位置。也就是说，遍历器对象本质上，就是一个指针对象。
2. 第一次调用指针对象的next方法，可以将指针指向数据结构的第一个成员。
3. 第二次调用指针对象的next方法，指针就指向数据结构的第二个成员。
4. 不断调用指针对象的next方法，直到它指向数据结构的结束位置。

每一次调用next方法，都会返回数据结构的当前成员的信息。具体来说，就是返回一个包含value和done两个属性的对象。其中，value属性是当前成员的值，done属性是一个布尔值，表示遍历是否结束。

模拟遍历过程
```javascript
function makeIterator(array) {
  var nextIndex = 0;
  return {
    next: function() {
      return nextIndex < array.length ?
        {value: array[nextIndex++], done: false} :
        {value: undefined, done: true};
    }
  };
}

var it = makeIterator(['a', 'b']);

it.next() // { value: "a", done: false }
it.next() // { value: "b", done: false }
it.next() // { value: undefined, done: true }
```

#### for of语法
- 当使用for...of循环遍历某种数据结构时，该循环会自动去寻找 Iterator 接口。
- ES6 规定，默认的 Iterator 接口部署在数据结构的Symbol.iterator属性上，该属性可以是自身属性或者原型链上的属性。
- Symbol.iterator属性是一个函数，就是当前数据结构默认的遍历器生成函数。执行这个函数，就会返回一个遍历数据

原生常见具备 Iterator 接口的数据结构：
- Array
- Map
- Set
- String
- 函数的 arguments 对象
- NodeList 对象

思考：为什么普通对象不可以用for of遍历

#### 与Generator函数
使用Generator函数来生成遍历器函数
```javascript
const obj = {
  * [Symbol.iterator]() {
    yield 'a';
    yield 'b';
    yield 'c';
  }
};
for (const x of obj) {
  console.log(x);
}
```
遍历Generator函数
```javascript
function* generator() {
  yield 'a';
  yield 'b';
  yield 'c';
}
var gen = generator()
for (const x of gen) {
  console.log(x);
}
typeof gen[Symbol.iterator] // function
gen.next === gen[Symbol.iterator]().next // true
```

#### for of与for in比较
- for in遍历得到的是键名，即key；而for of遍历得到的是键值，即value
- for in会遍历手动添加的其他键，甚至包括原型链上的键；而for of只会与遍历器函数有关
- 某些情况下，for in循环会以任意顺序遍历键名；而for of只会与遍历器函数的线性顺序有关
- for in主要是为遍历对象而设计的；for of是为遍历器接口设计的
