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
router.get('/form', function(req, res) {
  	res.render('pups_form/form');
});

router.post('/', async (req, res) => {
	var pack = req.body;
	console.log(pack);

	await py.spintax( {text: pack.text}, (spintax)=>{
		helper.spinner2(spintax,pack, (result)=>{
			res.send(result);
		});
	});
	// res.send({msg: "holo"});
});
module.exports = router;
