var express = require('express');
var router 	= express.Router();
var py 		= require('./../modules/py.js');
var helper 	= require('./../modules/helper.js');


router.get('/', function(req, res) {
  	res.render('index', { 
  		title: 'My Web Spinner Tool' ,
  		lib: ['wordnet',
  			'xxx']
	});
});

router.post('/', async (req, res) => {
	var pack = req.body;
	console.log(pack);

	switch(pack.type){
		case 'add-vocab':
			await helper.addVocab(name);
			break;
		case 'add-synonym':
			break;
		// case 'add-stop-vocab':
		// 	break;
		// case 'add-stop-word':
		// 	break;
		case 'text-spin':
			await py.spinner( {text: pack.text, lib: pack.lib}, (result)=>{
				res.send({text: result});
			});
			break;
		default:
			res.send({error:'wrong type'});
	}
	// await py.spinner({text: req.body.text, type: "wordnet"}, (msg)=>{
	// 	res.send({text: msg});
	// });	
	// res.send({data:'thanks'});
});
module.exports = router;
