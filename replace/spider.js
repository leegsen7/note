var path = require('path');
var fs = require('fs');
var cheerio = require('cheerio');

var srcPath = path.resolve('../.././assets/dist/js');
var files = fs.readdirSync(srcPath).sort();
var filesNameArr = [];

// 转义函数
function escape2Html(str) { 
	var arrEntities={'lt':'<','gt':'>','nbsp':' ','amp':'&','quot':'"'}; 
	return str.replace(/&(lt|gt|nbsp|amp|quot);/ig,function(all,t){
		return arrEntities[t];
	}); 
} 

for (var i in files){
	if (files[i].length > 25){
		filesNameArr.push(files[i]);
	}
}

fs.readFile("Index.cshtml","utf-8",function(err,data){
	if (err){
		console.log(err);
	}
	else {
		var $ = cheerio.load(data);

		$('script#appBundle').attr('src','~/assets/dist/js/'+filesNameArr[0]);
		$('script#commonBundle').attr('src','~/assets/dist/js/'+filesNameArr[1]);

		var htmlData = escape2Html($.html());
		
		fs.writeFile('./Index.cshtml',htmlData,function(err){
			if(err) throw err;

			console.log('has finished');
		})
	}	
});