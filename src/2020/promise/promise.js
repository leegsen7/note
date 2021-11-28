/**
 * 1、增加队列，支持多次调用
 * 2、增加then原型方法
 * @type {{PEDDING: string, FULFILLED: string, REJECTED: string}}
 */

const constant = {
  PEDDING: 'pedding',
  FULFILLED: 'fulfilled',
  REJECTED: 'rejected',
}

const isFunction = fn => typeof fn === 'function'

// 运行微任务
// 2.2.4: `onFulfilled` or `onRejected` must not be called until the execution context stack contains only platform code.
// 这里的 “平台代码”是指引擎，环境，和 promise 实现代码
// 实际上，这个要求确保 onFulfilled 和 onRejected 都在下一轮的事件循环中（一个新的栈）被异步调用。
// 可以用宏任务，例如：setTimeout，setImmediate 或者微任务，例如：MutationObsever 或 process.nextTick 实现。
// 由于 promise 的实现被当做平台代码，所以它本身可能包含一个任务队列或 “trampoline” 的处理程序
const runMicroTask = fn => {
  if (typeof MutationObserver !== 'undefined') {
    let counter = 1
    const observer = new MutationObserver(fn)
    const textNode = document.createTextNode(String(counter))
    observer.observe(textNode, {
      characterData: true
    })
    counter = (counter + 1) % 2
    textNode.data = String(counter)
  } else if (typeof global !== 'undefined') {
    process.nextTick(fn)
  } else {
    setTimeout(fn, 0)
  }
}

const resolvePromise = (promise2, x, resolve, reject) => {
  // 这里应该报一个循环引用的类型错误
  if (promise2 === x) {
    return reject(new TypeError('循环引用'));
  }
  // 表示是否调用过成功或者失败
  let called;
  if (x !== null && (typeof x === 'object' || typeof x === 'function')) {
    //可能是promise 看这个对象中是否有then 如果有 姑且作为promise 用try catch防止报错
    try {
      // 看x是不是一个伪promise对象，即拥有then方法
      let then = x.then;
      if (typeof then === 'function') {
        //成功
        then.call(x, function (y) {
          // 避免别人写的promise中既走resolve又走reject的情况
          if (called) return
          called = true;
          resolvePromise(promise2, y, resolve, reject)
        }, function (err) {
          if (called) return
          called = true;
          reject(err);
        })
      } else {
        // 如果then不是函数 则把x作为返回值.
        resolve(x)
      }
    } catch (e) {
      if (called) return
      called = true;
      reject(e)
    }
  } else {
    // 普通值
    resolve(x)
  }
}

class MyPromise {
  constructor(hanlde) {
    this.status = constant.PEDDING
    this.value = undefined
    this.fulfilledCallbacks = []
    this.rejectedCallbacks = []
    // 立即执行handle函数
    try {
      hanlde(this.handleResolve.bind(this), this.handleReject.bind(this))
    } catch (e) {
      this.handleReject(e)
    }
  }
  handleResolve(value) {
    if (this.status !== constant.PEDDING) return
    // 支持resolve一个promise实例
    if (value instanceof MyPromise) {
      value.then(val => this.handleResolve(val), err => this.handleReject(err))
    } else {
      this.status = constant.FULFILLED
      this.value = value
      // 使用微任务运行
      runMicroTask(() => {
        let cb
        while (cb = this.fulfilledCallbacks.shift()) {
          cb(value)
        }
      })
    }
  }
  handleReject(value) {
    if (this.status === constant.PEDDING) {
      this.status = constant.REJECTED
      this.value = value
      // 使用微任务运行
      runMicroTask(() => {
        let cb
        while (cb = this.rejectedCallbacks.shift()) {
          cb(value)
        }
      })
    }
  }
  then(onFulfilled, onRejected) {
    // 兼容参数非函数
    if (!isFunction(onFulfilled)) {
      onFulfilled = x => x
    }
    // onRejected非函数时，兼容rejected状态的传递
    if (!isFunction(onRejected)) {
      onRejected = err => {
        throw err
      }
    }
    const {
      status,
      value,
    } = this
    // 返回一个新的Promise实例
    const promise = new MyPromise((resolve, reject) => {
      // 等待中
      if (status === constant.PEDDING) {
        this.fulfilledCallbacks.push((value) => {
          try {
            const res = onFulfilled(value)
            resolvePromise(promise, res, resolve, reject)
          } catch (e) {
            reject(e)
          }
        })
        this.rejectedCallbacks.push((value) => {
          try {
            const res = onRejected(value)
            resolvePromise(promise, res, resolve, reject)
          } catch (e) {
            reject(e)
          }
        })
        return
      }
      // 成功状态
      if (status === constant.FULFILLED) {
        runMicroTask(() => {
          try {
            const res = onFulfilled(value)
            resolvePromise(promise, res, resolve, reject)
          } catch (e) {
            reject(e)
          }
        })
        return
      }
      // 失败状态和成功状态类似
      if (status === constant.REJECTED) {
        runMicroTask(() => {
          try {
            const res = onRejected(value)
            resolvePromise(promise, res, resolve, reject)
          } catch (e) {
            reject(e)
          }
        })
        return
      }
    })
    return promise
  }
  catch(onRejected) {
    return this.then(undefined, onRejected)
  }
  // 不管状态如何，都会执行，支持cb返回promise，传递当前的状态和value（注意：不是cb的状态和value），并且返回promise的实例
  finally(cb) {
    if (isFunction(cb)) {
      return this.then(value => {
        return MyPromise.resolve(cb()).then(() => value)
      }, err => {
        return MyPromise.resolve(cb()).then(undefined, () => err)
      })
    }
    return this.then(cb, cb)
  }
  // 静态方法-支持promise实例
  static resolve(value) {
    return new MyPromise(resolve => resolve(value))
  }
  static reject(value) {
    return new MyPromise((resolve, reject) => reject(value))
  }
  static all(list) {
    return new MyPromise((resolve, reject) => {
      const values = []
      let count = 0
      for (const [i, item] of Object.entries(list)) {
        // 用静态方法resolve来兼容promise实例和普通值情况
        MyPromise.resolve(item).then(res => {
          values[i] = res
          count++
          // 所有的都成功
          if (count === list.length) {
            resolve(values)
          }
        }).catch(err => reject(err))
      }
    })
  }
  static race(list) {
    return new MyPromise((resolve, reject) => {
      for (const item of list) {
        // 用静态方法resolve来兼容promise实例和普通值情况
        // 只要其中一项的状态改变了就返回
        MyPromise.resolve(item).then(resolve).catch(reject)
      }
    })
  }
}

MyPromise.defer = MyPromise.deferred = function(){
  let dfd = {};
  dfd.promise = new MyPromise((resolve,reject)=>{
    dfd.resolve = resolve;
    dfd.reject = reject;
  });
  return dfd;
}

module.exports = MyPromise
