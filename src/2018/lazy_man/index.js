// 实现一个LazyMan，可以按照以下方式调用:
// LazyMan(“Hank”)输出:
// Hi! This is Hank!

// LazyMan(“Hank”).sleep(10).eat(“dinner”)输出
// Hi! This is Hank!
//等待10秒..
// Wake up after 10
// Eat dinner~

// LazyMan(“Hank”).eat(“dinner”).eat(“supper”)输出
// Hi This is Hank!
// Eat dinner~
// Eat supper~

// LazyMan(“Hank”).sleepFirst(5).eat(“supper”)输出
//等待5秒
// Wake up after 5
// Hi This is Hank!
// Eat supper

class LazyManClass {
    constructor(name) {
        this.name = name
        this.sleepFirstTime = 0
        this.callbackList = [() => console.log(`Hi! This is ${name}`)]
        setTimeout(this.evalFn.bind(this),0)
    }
    sleepFirst(time) {
        this.sleepFirstTime += time
        console.log(`等待${time}秒`)
        return this
    }
    sleep(time) {
        this.callbackList.push(time)
        return this
    }
    eat(str) {
        this.callbackList.push(() => console.log(`Eat ${str}`))
        return this
    }
    evalFn() {
        let len = this.callbackList.length
        setTimeout(() => {
            for (let i=0; i<len; i++) {
                let itemVal = this.callbackList[i]
                if (typeof itemVal === 'function') {
                    itemVal()
                }
                else {
                    console.log(`等待${itemVal}秒`)
                    setTimeout(() => {
                        this.callbackList.splice(0, i + 1)
                        this.sleepFirstTime = 0
                        this.evalFn()
                    },itemVal*1e3)
                    return
                }
            }
        },(this.sleepFirstTime) * 1e3)
    }
}

const LazyMan = name => new LazyManClass(name)

// LazyMan('Hank').eat('dinner').eat('supper').sleepFirst(2)
// LazyMan('lee').sleep(2).eat('apple').sleep(1).eat('orange').sleepFirst(2)
LazyMan('lee').sleep(2).eat('apple').sleep(1).eat('orange')