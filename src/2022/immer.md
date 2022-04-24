## immer的简版实现

### 什么是immer
> Create the next immutable state tree by simply modifying the current tree

### 对比
```javascript
const baseState = [
    {
        title: "Learn TypeScript",
        done: true
    },
    {
        title: "Try Immer",
        done: false
    }
]
```
假设我们有上述基本状态，我们需要更新第二个 todo，并添加第三个。但是，我们不想改变原始的 baseState，我们也想避免深度克隆（以保留第一个 todo）
**原生方案**
```javascript
const nextState = baseState.slice() // 浅拷贝数组
nextState[1] = {
    // 替换第一层元素
    ...nextState[1], // 浅拷贝第一层元素
    done: true // 期望的更新
}
// 因为 nextState 是新拷贝的, 所以使用 push 方法是安全的,
nextState.push({
    title: "Do LeetCode",
    done: false,
})
```
**使用immer**
```javascript
import immer from "immer"

const nextState = immer(baseState, draft => {
    draft[1].done = true
    draft.push({title: "Tweet about it"})
})
```

### immer的柯里化用法
```javascript
import immer from "immer"

// curried:
const curriedFn = immer(draft => {
    draft[1].done = true
    draft.push({title: "Tweet about it"})
})

const nextState = curriedFn(baseState)
```

### 简单柯里化实现
```javascript
function immer(baseState, thunk) {
  if (typeof baseState === 'function' && typeof thunk !== 'function') {
    return function curriedImmer(tempState) {
      return immer(tempState, baseState)
    }
  }
  // ...
}
```

### 两个核心设计理念：懒代理、写时拷贝

### 简单流程
![image](https://user-images.githubusercontent.com/15691486/162022396-354dfce6-a490-4b8a-9ac0-571bf5e6152e.png)

### 简易源码
[immer.js](./immer.js)
