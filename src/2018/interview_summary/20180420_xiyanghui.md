### 西洋汇

问题1：请用 javascript 实现一个函数 parseUrl(url)，将一段 url 字符串解析为 Object。<br>
例如：`parseUrl("http://www.xiyanghui.com/product/list?id=123456&sort=discount#title");`<br>
返回结果：
```javascript
{
    protocol: "http",
    host: "www.xiyanghui.com",
    path: "/product/list",
    query: {
        id: "12345",
        sort: "discount"
    },
    hash: "title"
}
```
答案如下：
```javascript
let url = 'http://www.xiyanghui.com/product/list?id=123456&sort=discount#title'

function parseUrl(url) {
    const parseReg = /(https?):\/\/([^\/]+)([^\?#]*)?\??([^#]*)?#?(.*)/
    let matchuRes = url.match(parseReg)
    if (matchuRes) {
        let list = ['protocol', 'host', 'path', 'query', 'hash']
        let obj = {}
        matchuRes.forEach((val,index) => {
            if (index > 0) {
                let key = list[index-1]
                if (key !== 'query') {
                    obj[key] = val
                }
                else {
                    let subObj = {}
                    val.split('&').forEach(item => {
                        let arr = item.split('=')
                        subObj[arr[0]] = arr[1]
                    })
                    obj[key] = subObj
                }
            }
        })
        return obj
    }
    return null
}
console.log(parseUrl(url))
```

问题2：请用 javascript 实现一个函数 verify(text), 检查字串里面的括号是否有正确嵌套<br>
例如：
```javascript
verify("---(++++)----")                         -> 1
verify("")                                      -> 1
verify("before ( middle []) after ")            -> 1
verify(") (")                                   -> 0
verify("} {")                                   -> 1 //no, this is not a mistake.
verify("<(   >)")                               -> 0
verify("(  [  <>  ()  ]  <>  )")                -> 1
verify("   (      [)")                          -> 0
```
答案如下：
```javascript
function verify(text) {
    const leftBracketText = '[(<}'
    const rightBracketText = '])>{'
    let stackList = []
    let len = text.length

    function isMatchFn(val1,val2) {
        if (!val1 || !val2) return
        return leftBracketText.indexOf(val1) === rightBracketText.indexOf(val2)
    }
    for (let i=0; i<len; i++) {
        if (leftBracketText.includes(text[i])) {
            stackList.push(text[i])
        }
        else if (rightBracketText.includes(text[i])) {
            let res = stackList.pop()
            if (!isMatchFn(res, text[i])) return 0
        }
    }

    return Number(!stackList.length)
}
```

问题3：用js写一个简单的交通灯功能，10秒绿灯倒数，3秒黄灯倒数，5秒红灯倒数，如何让三个灯不断交替重复？<br>
答案如下：
```javascript
const configList = [
    {
        type: 'green',
        time: 10,
    },
    {
        type: 'yellow',
        time: 3,
    },
    {
        type: 'red',
        time: 5,
    },
]
let curIndex = 0
let len = configList.length

let fnList = configList.map(item => {
    return function() {
        let {type, time} = item
        console.log(type + '灯')
        ;(function fn() {
            console.log(time + 's')
            setTimeout(() => {
                time--
                if (time === 0) {
                    nextFn()
                }
                else {
                    fn()
                }
            }, 1e3)
        })()
    }
})

function nextFn() {
    curIndex = curIndex === len - 1 ? 0 : curIndex + 1
    fnList[curIndex]()
}

fnList[0]()
```