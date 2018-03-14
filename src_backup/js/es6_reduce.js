var dataArr=[
        {name:'王',money:1},
        {name:'李',money:2},
        {name:'张',money:3},
        {name:'王',money:1},
        {name:'李',money:2},
        {name:'张',money:3},
        {name:'王',money:1},
        {name:'李',money:2},
        {name:'张',money:3},
    ]

var arr = Array.from(dataArr.reduce((m,v)=>m.set(v.name,m.has(v.name)?m.get(v.name)+v.money:v.money),new Map),arr=>({name:arr[0],money:arr[1]}))

console.log(arr)