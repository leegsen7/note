let express = require('express'),
	bodyParser = require('body-parser');

let app = express();

// app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("./"));

app.get('/test',(req,res) => {
	let callback = req.query.callback;
	let a = req.query.a;
	console.log(a);
	let data = {
		a:'aaa',
		b:'bbb',
		c:'ccc'
	};
	let newData = JSON.stringify(data);
	if (callback){
		res.send(`${callback}(${newData})`);
		console.log(`${callback}(${newData})`);
	}
	else {
		res.send(data);
	}
});

app.post('/test',(req,res) => {
	console.log(req.body);
	let a = req.body.a;
	let b = req.body.b;
	let c = req.body.c;
	res.send(`method:post,a is ${a},b is ${b},c is ${c}`);
});

app.listen(88,() => {
	console.log('app is running...');
})