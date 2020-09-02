### 实现一个自动执行generator的co函数

[generator函数](https://es6.ruanyifeng.com/#docs/generator)

#### co函数
```javascript
const co = gen => {
  // 支持yield一个promise
  if (gen instanceof Promise) {
    return gen
  }
  return new Promise((resolve, reject) => {
    // 非generator直接返回
    if (!gen || typeof gen.next !== 'function') {
      resolve(gen)
      return
    }
    const recursion = value => {
      // 一直递归调用next方法
      var res = gen.next(value)
      // generator函数结束返回
      if (res.done) {
        return resolve(res.value)
      }
      // 支持yield一个generator函数
      co(res.value).then(recursion).catch(reject)
    }

    recursion()
  })
}
```

#### 测试案例
```javascript
const delay = (time, data) => new Promise(resolve => {
  setTimeout(() => {
    resolve(data)
  }, time)
})

function * test(num) {
  yield delay(1000)
  const double = yield num * num
  return double
}

function * generator(num) {
  const double = yield test(num)
  const a = yield delay(500, double)
  const b = yield a * 3.14
  return b
}

co(generator(10)).then(res => {
  console.log(res) // 314
})
```
