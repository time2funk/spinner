var sqlite3 = require('sqlite3').verbose();

module.exports.spinner2 = async function (spintax, pack, callback){
	console.log('analiza2');
	var key = pack['m-tag'];
	var rkey = pack['r-tag'];
	spintax = spintax.substring(2, spintax.length-3);

	var result, words, length, keylen;
	if(key){
		if(rkey){
			[result, words, length, keylen] = await keyResult(spintax, key, rkey);
			await callback({text:result, len: length, words: words, key:key, rkey:rkey, keylen:keylen  });
		}
		else{
			[result, words, length, keylen] = await keyResult(spintax, key);
			await callback({text:result, len: length, words: words, key:key, keylen:keylen   });
		}
	}else{
		[result, words, length] = await randomResult(spintax);
		await callback({text:result, len: length, words: words });
	}
}
function getSpintaxLength(spintax){
	var regexp = /{[\w\s|\\/`.,'"]*}/ig;
	var iterator = 0;
	var foo;
	while ( foo = regexp.exec(spintax)) {

		iterator++;
	}
	return iterator;
}
function keyResult(spintax, key, rkey){
	// var regexp = /{[\w\s|.]*}/ig;
	var regexp = /{[\w\s|\\/`.,'"]*}/ig;
	var foo;
	var last_pos = 0;
	var words = {};
	var result = '';
	var iterator = 0;
	var keylen = 0;
	while ( foo = regexp.exec(spintax)) {

		result += spintax.substring(last_pos,foo.index);
		
		var tmp = foo[0].replace(/[}{]*/g,'').split('|');

		var syn = '';
		for(var i=0; i<tmp.length; i++){

			var item = tmp[i].match(key);
			// console.log(item);
			if(item){
				keylen++;
				if(rkey)
					syn = rkey;
				else
					syn = tmp[i];
				break;
			}
		}
		if(!syn){
			var random = randomInteger(0, tmp.length-1);
			var random_syn = tmp[random];
			syn = random_syn;
		}

		result += syn;
		if (words[syn]){
			words[syn] += 1;
		}else{
			words[syn] = 1;
		}

		last_pos = regexp.lastIndex;
		iterator++;
	}
	result += spintax.substring(last_pos,spintax.length-1);
	
	wordsSorted = sortObject2(words);
	for(var i=0; i<wordsSorted.length; i++){
		// console.log(iterator+ " " +100+ " " +wordsSorted[i]['times'] );
		wordsSorted[i]['percentage'] = (100*wordsSorted[i]['times']/iterator).toFixed(2);
	}
	keylen = 100*keylen/iterator;
	return [result, wordsSorted, iterator, keylen];
}
function randomResult(spintax){
	// var regexp = /{[\w\s|.]*}/ig;
	var regexp = /{[\w\s|\\/`.,'"]*}/ig;
	var foo;
	var last_pos = 0;
	var words = {};
	var result = '';
	var iterator = 0;
	while ( foo = regexp.exec(spintax)) {
		
		var tmp = foo[0].replace(/[}{]*/g,'').split('|');

		result += spintax.substring(last_pos,foo.index);
		var random = randomInteger(0, tmp.length-1);
		var random_syn = tmp[random];
		var syn = random_syn;

		result += syn;
		if (words[syn]){
			words[syn] += 1;
		}else{
			words[syn] = 1;
		}
		last_pos = regexp.lastIndex;
		iterator++;
	}
	result += spintax.substring(last_pos,spintax.length-1);
	
	wordsSorted = sortObject2(words);
	for(var i=0; i<wordsSorted.length; i++){
		wordsSorted[i]['percentage'] = (iterator/100*wordsSorted[i]['times']).toFixed(2);
	}
	return [result, wordsSorted, iterator];
}
function sortObject(o) {
	return Object
		.keys(o)
		.sort((a, b) => o[b]-o[a])
		.reduce((obj, key) => ({
		 ...obj, 
		 [key]: o[key]
		}), {});
}
function sortObject2(obj) {
    var arr = [];
    for (var prop in obj) {
        if (obj.hasOwnProperty(prop)) {
            arr.push({
                'key': prop,
                'times': obj[prop]
            });
        }
    }
    arr.sort(function(a, b) {
        return b.times - a.times;
    }); 
    return arr;
}
function randomInteger(min, max) {
	var rand = min - 0.5 + Math.random() * (max - min + 1)
	rand = Math.round(rand);
	return rand;
}
// module.exports.spinner = async function (spintax, pack, callback){
// 	try {
// 		// var variations = spintax.match(/{([\w|]*)}/ig);
// 		console.log('analiza');
// 		spintax = spintax.substring(2, spintax.length-3);
// 		// spintax = spintax.replace('\\n', '\n')
// 		var result = '';
// 		var unique = {};
// 		var regexp = /{[\w\s|.]*}/ig;

// 		var foo;
// 		var iterator = 0;
// 		console.log('6');
// 		// regexp.lastIndex = 0;
// 		var last_pos = 0;
// 		while ( foo = regexp.exec(spintax)) {
// 			// if(bool>1)
// 			// 	break; 
// 			console.log('5');
// 			console.log(foo);
// 			var tmp = foo[0].replace(/[}{]*/g,'').split('|');

// 			console.log('4');
// 			console.log(tmp);
// 			// for(var i=0; i<foo.index; i++){

// 			console.log('3');
// 			console.log("regexp.lastIndex:"+regexp.lastIndex);
// 			console.log("last_pos:"+last_pos);
// 			console.log("foo.index:"+foo.index);
// 			result += spintax.substring(last_pos,foo.index);
// 			// }

// 			console.log('2');
// 			// Math.random() * (max - min) + min;
			
// 			var random = randomInteger(0, tmp.length-1);
// 			console.log('random:'+random);
// 			var random_syn = tmp[random];
// 			var syn = random_syn;

// 			console.log('random_syn:'+syn);

// 			if (unique[syn]){
// 				unique[syn]['times'] += 1;
// 			}else{
// 				unique[syn] = {['times'] : 1};
// 			}
// 			// variations += random_syn;
// 			result += syn;
// 			// regexp.lastIndex = foo.lastIndex;
// 			iterator++;
// 			last_pos = regexp.lastIndex;
// 			console.log('1');
// 		}/////////////////////////////////////////////////////
// 		var length = iterator;

// 		for(var word in unique){
// 			unique[word]['percentage'] = length/100*unique[word]['times']
// 		}console.log(unique);

// 		var sortable = [];
// 		for (var word in unique) {
// 		    sortable.push([word, unique[word]['percentage'], unique[word]['times']]);
// 		}
// 		sortable.sort(function(b, a) {
// 		    return a[1] - b[1];
// 		});


// 		console.log('length:'+length);
// 		console.log('0');
// 		await callback({text:result, len: length, unique: sortable,  });
// 	} catch (e) {
// 		console.log(e);
// 		return 0;
// 	}
// }


// module.exports.addVocab = async function (name, callback){
// 	try {
// 		let db = await new sqlite3.Database('data.db', (err)=>{
// 			if (err) {return console.error(err.message);}
// 		});

// 		await db.serialize(function() {
// 			let query = "INSERT INTO libs (name) VALUES( ? )";

// 			db.run(query, name);
// 		});

// 		await db.close( (err)=>{
// 			if (err) {return console.error(err.message);}
// 		});

// 	} catch (e) {
// 		console.log(e);
// 		return 0;
// 	}
// }
// module.exports.addStopVocab = async function (name, callback){
// 	try {

// 	} catch (e) {
// 		console.log(e);
// 		return 0;
// 	}
// }
// module.exports.addSynonym = async function (name, callback){
// 	try {

// 	} catch (e) {
// 		console.log(e);
// 		return 0;
// 	}
// }
// module.exports.addStopWord = async function (name, callback){
// 	try {

// 	} catch (e) {
// 		console.log(e);
// 		return 0;
// 	}
// }