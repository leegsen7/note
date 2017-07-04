const hTm = 60*60*1000,
	long = 24;

function plus0(num){
	return num > 9 ? num : `0${num}`;
}
function change(arg){
	let now = Date.now();
	let arr = [];
	let len = arg.length;
	for (let i=0;i<long;i++){
		let d = new Date(now-i*hTm);
		let subArr = [];
		subArr[0] = `${d.getFullYear()}-${plus0(d.getMonth()+1)}-${plus0(d.getDate())} ${plus0(d.getHours())}`;
		subArr[1] = null;
		let pipei = false;
		for (let j=len-1;j>-1;j--){
			if (arg[j][0] == subArr[0]){
				subArr[1] = arg[j][1];
				pipei = true;
				break;
			}
		}
		if (!pipei && subArr[0] > arg[0][0])
			subArr[1] = 0;
		arr.unshift(subArr);
	}

	console.log(arr);
}

let arr = [['2017-07-04 09',123],['2017-07-04 13',400],['2017-07-04 18',400],['2017-07-04 21',356]];

change(arr);

