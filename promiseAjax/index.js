function ajax(url){
	return new Promise((resolve,reject) => {
		let xml = new XMLHttpRequest();

		xml.open('get',url,true);
		xml.onload = function(){
			if (xml.readyState==4 && xml.status==200){
				let data = xml.responseText;
				// 保证返回json数据
				resolve(typeof data == "string" ? JSON.parse(data) : data);
			}
			else {
				reject(xml.responseText);
			}
		}
		xml.onerror = reject;
		xml.send();
	})
}