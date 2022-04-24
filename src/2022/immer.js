const isPlainObject = target => {
  return Object.prototype.toString.call(target) === '[object Object]'
}
 
function immer(baseState, thunk) {
  if (typeof baseState === 'function' && typeof thunk !== 'function') {
    thunk = baseState
    return function curriedProduce(tempState) {
      return immer(tempState, thunk)
    }
  }
  // Maps baseState objects to proxies
  const proxies = new Map()
  // Maps baseState objects to their copies
  const copies = new Map()
 
  const handler = {
    get(target, prop) {
      return createProxy(getCurrentSource(target)[prop])
    },
    has(target, prop) {
      return prop in getCurrentSource(target)
    },
    ownKeys(target) {
      return Reflect.ownKeys(getCurrentSource(target))
    },
    set(target, prop, value) {
      const current = createProxy(getCurrentSource(target)[prop])
      const newValue = createProxy(value)
      if (current !== newValue) {
        const copy = getOrCreateCopy(target)
        copy[prop] = newValue
      }
      return true
    },
    deleteProperty(target, property) {
      const copy = getOrCreateCopy(target)
      delete copy[property]
      return true
    }
  }
 
  // creates a copy for a base object if there ain't one
  function getOrCreateCopy(base) {
    let copy = copies.get(base)
    if (!copy) {
      copy = Array.isArray(base) ? base.slice() : Object.assign({}, base)
      copies.set(base, copy)
    }
    return copy
  }
 
  // returns the current source of trugth for a base object
  function getCurrentSource(base) {
    const copy = copies.get(base)
    return copy || base
  }
 
  // creates a proxy for plain objects / arrays
  function createProxy(base) {
    if (isPlainObject(base) || Array.isArray(base)) {
      if (proxies.has(base)) return proxies.get(base)
      const proxy = new Proxy(base, handler)
      proxies.set(base, proxy)
      return proxy
    }
    return base
  }
 
  // checks if the given base object has modifications, either because it is modified, or
  // because one of it's children is
  function hasChanges(base) {
    const proxy = proxies.get(base)
    if (!proxy) return false // nobody did read this object
    if (copies.has(base)) return true // a copy was created, so there are changes
    // look deeper
    const keys = Object.keys(base)
    for (let i = 0; i < keys.length; i++) {
      if (hasChanges(base[keys[i]])) return true
    }
    return false
  }
 
  // given a base object, returns it if unmodified, or return the changed cloned if modified
  function finalize(base) {
    if (isPlainObject(base)) return finalizeObject(base)
    if (Array.isArray(base)) return finalizeArray(base)
    return base
  }
 
  function finalizeObject(thing) {
    if (!hasChanges(thing)) return thing
    const copy = getOrCreateCopy(thing)
    Object.keys(copy).forEach(prop => {
      copy[prop] = finalize(copy[prop])
    })
    return copy
  }
 
  function finalizeArray(thing) {
    if (!hasChanges(thing)) return thing
    const copy = getOrCreateCopy(thing)
    copy.forEach((value, index) => {
      copy[index] = finalize(copy[index])
    })
    return copy
  }
 
  // create proxy for root
  const rootClone = createProxy(baseState)
  // execute the thunk
  thunk(rootClone)
  // and finalize the modified proxy
  return finalize(baseState)
}
 
const state = {
  books: ['a', 'b', 'c'],
  info: {
    sports: ['basketball', 'bike', 'swiming'],
    tel: '188',
    address: '123456',
    ext: {
      age: 15,
      name: 'Mike',
    },
  },
}
 
const temp = immer(state, draft => {
  draft.books.push('d')
  draft.info.tel = '199'
  draft.info.sports.push('football')
  console.log('end')
})
console.log('--------state----------')
console.log(state)
console.log('--------temp----------')
console.log(temp)
console.log(state.books === temp.books)
console.log(state.info === temp.info)
console.log(state.info.ext === temp.info.ext)
