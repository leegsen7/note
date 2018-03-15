* charTemplate 文件夹是实现类似于es6中字符串夹带变量的解析函数

* fixTab 文件夹是手机腾讯网实现非顶部块在滑动过程中置顶的方案，是Web APP实现此功能较为完美的方案，完美兼容iOS
    * Demo地址: [Demo](https://leegsen7.github.io/note/fixTab/index.html)


* triangle 文件夹是一个css实现三角形的方法和原理
    * Demo地址: [Demo](https://leegsen7.github.io/note/triangle/triangle.html)

* event 文件夹是一个通俗易懂的事件捕获、事件冒泡和事件委托的Demo
    * Demo地址: [Demo](https://leegsen7.github.io/note/event/index.html)

* promiseAjax 文件夹是利用promise封装的ajax请求和jsonp跨域请求，有下面几种用法
    ```javascript
    ajax({
        url:url,
        data:data,
        method:get||post, // 默认为get，这里不能jsonp
    }).then(fn).catch(fn);
    ```
    ```javascript
    ajax.get({ // 这里的get还可以是post和jsonp
        url:url,
        data:data
    }).then(fn).catch(fn);
    ```
    ```javascript
    // 当不需要data的时候，还可以这样写,可以是get,post,jsonp
    ajax.get(url).then(fn).catch(fn);
    // 当这样写的时候，就是默认为get
    ajax(url).then(fn).catch(fn)
    ```
    * 百度搜索提示的API是个大奇葩，别人家的参数都是callback=....,而它家的cb=...,所以新增了一个参数，如下
    ```javascript
    ajax.jsonp({
        url:url,
        data:data,
        callback:'cb' || 'callback' // 默认是'callback'
    }).then(fn).catch(fn);
    ```
    * Demo地址: [Demo](https://leegsen7.github.io/note/promiseAjax/index.html)