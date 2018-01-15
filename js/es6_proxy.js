let _data = {
    testArr: [
        {
            active: false,
            text: 'a',
        },
        {
            active: true,
            text: 'b',
        }
    ],
    testObj: {
        name: 'lee',
        friendList: [
            {
                name: 'lee',
                isOpen: false,
            }
        ]
    }
}

function proxyEvent(data) {
    proxyChild(data)
    return new Proxy(data,{
        get(target,key,receiver) {
            return Reflect.get(target, key, receiver)
        },
        set(target,key,value,receiver) {
            console.log(`set => ${key}`)
            return Reflect.set(target, key, value, receiver)
        }
    })
}

function proxyChild(data) {
    for (key in data) {
        let val = data[key]
        if (val instanceof Object) {
            data[key] = proxyEvent(val)
        }
    }
}

_data = proxyEvent(_data)

// _data.testArr.push('ddd')
let item = _data.testArr[1]
item.active = false
_data.testObj.name = 'leegsen'
let list = _data.testObj.friendList
list[0].isOpen = true

console.dir(_data)

