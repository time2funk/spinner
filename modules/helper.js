var sqlite3 = require('sqlite3').verbose();


module.exports.addVocab = async function (name, callback){
	try {
		let db = await new sqlite3.Database('data.db', (err)=>{
			if (err) {return console.error(err.message);}
		});

		await db.serialize(function() {
			let query = "INSERT INTO libs (name) VALUES( ? )";

			db.run(query, name);
		});

		await db.close( (err)=>{
			if (err) {return console.error(err.message);}
		});

	} catch (e) {
		console.log(e);
		return 0;
	}
}
module.exports.addStopVocab = async function (name, callback){
	try {

	} catch (e) {
		console.log(e);
		return 0;
	}
}
module.exports.addSynonym = async function (name, callback){
	try {

	} catch (e) {
		console.log(e);
		return 0;
	}
}
module.exports.addStopWord = async function (name, callback){
	try {

	} catch (e) {
		console.log(e);
		return 0;
	}
}