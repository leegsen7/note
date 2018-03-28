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