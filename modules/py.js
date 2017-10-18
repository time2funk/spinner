const PythonShell = require('python-shell');
PythonShell.defaultOptions = {
    scriptPath: './modules/py/',
  	mode: 'text',
    pythonPath: 'python3'
};

module.exports.spintax = async function (obj, callback){
	try {
		
		await wordnet(obj.text, async (result)=>{
			callback(result);
		});

	} catch (e) {
		console.log(e);
		return 0;
	}
}

async function wordnet(text, callback){ // !
	try {
		var pyshell =  new PythonShell('spinner.py');
		var msg;

		pyshell.send(text);
		
		pyshell.on('message', function (message) {
			console.log('> text: '+message);
			if(message)
				msg = message;
		});
		await pyshell.end(function (err) {
			if (err) throw err;
			console.log('> spinner done his do');	
			callback(msg);
		});

	} catch (e) {
		console.log(e);
		return 0;
	}
}

// async function xxx(text, callback){ // !
// 	try {
// 		var pyshell =  new PythonShell('vocab.py');
// 		var msg;

// 		pyshell.send(text);
		
// 		pyshell.on('message', function (message) {
// 			console.log('> text: '+message);
// 			msg = message;
// 		});
// 		await pyshell.end(function (err) {
// 			if (err) throw err;
// 			console.log('> spinner done his do');	
// 			callback(msg);
// 		});
// 	} catch (e) {
// 		console.log(e);
// 		return 0;
// 	}
// }