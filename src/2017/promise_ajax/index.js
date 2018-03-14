;(function(window){
	var ajax = (function(){
		var ajax = ajaxData => new ajax.fn.init(ajaxData);

		ajax.fn = ajax.prototype = {
			constructor: ajax,
			init: function(ajaxData){
				let url = '',method = 'get',data = null;
				if (typeof ajaxData == "string"){
					url = ajaxData;
				}
				else {
					[url,data,method] = [ajaxData.url,ajaxData.data,ajaxData.method || 'get'];
				}
				let xml = new XMLHttpRequest();

				return new Promise((resolve,reject) => {
					if ((!method || method.toLowerCase() == 'get') && data){
						url += '?'+this.dataToStr(data);
					}

					xml.open(method || "get",url,true);
					
					xml.onload = function(){
						if (xml.readyState==4 && xml.status==200){
							// let data = xml.responseText;
							// 保证返回json数据
							// resolve(typeof data == "string" ? JSON.parse(data) : data);
							return resolve(xml.responseText);
						}
						else {
							return reject(xml.responseText);
						}
					}
					xml.onerror = reject;

					if (data && method && method.toLowerCase() == 'post'){
						xml.setRequestHeader("Content-type","application/x-www-form-urlencoded");
						xml.send(this.dataToStr(data));
					}
					else {
						xml.send();
					}
				});
			},
			get: function(ajaxData){
				ajaxData.method = 'get';
				return this.init(ajaxData);
			},
			post: function(ajaxData){
				ajaxData.method = 'post';
				return this.init(ajaxData);
			},
			jsonp: function(ajaxData){
				return new Promise((resolve,reject) => {
					let url = '',data = null;

					if (typeof ajaxData == "string"){
						url = ajaxData;
					}
					else {
						[url,data] = [ajaxData.url,ajaxData.data];
					}
					let element = document.createElement('script');
					let callbackName = 'callbackFunc_' + new Date().getTime();
					let callback = ajaxData.callback || 'callback';
					element.src = data?`${url}?${callback}=${callbackName}&${this.dataToStr(data)}`:`${url}?${callback}=${callbackName}`;
					document.getElementsByTagName('head')[0].appendChild(element);

					window[callbackName] = function(result){
						element.remove();
						if (result){
							resolve(result);
						}
						else {
							reject();
						}
					}
				})
			},
			dataToStr: function(data){
				let str = '';

				Object.keys(data).forEach((value) => {
					str += value+'='+data[value]+"&";
				});
				str = str.slice(0,-1);

				return str;
			}
		}

		ajax.get = data => ajax.fn.get(data);
		ajax.post = data => ajax.fn.post(data);
		ajax.jsonp = data => ajax.fn.jsonp(data);

		ajax.fn.init.prototype = ajax.fn;

		return ajax;
	})();

	window.ajax = ajax;
})(window);