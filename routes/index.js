var express = require('express');
var router 	= express.Router();

var sqlite3 = require('sqlite3').verbose();
let db 		= new sqlite3.Database('data.db', ()=>{
	console.log('sqlite3 db connected');
});

var py = require('./../modules/py.js');


router.get('/', function(req, res) {
  	res.render('index', { 
  		title: 'My Web Spinner Tool' ,
  		lib: ['wordnet',
  			'vocab']
	});
});

router.post('/', async (req, res) => {
	console.log(req.body);
	// await py.spinner({text: req.body.text, type: "wordnet"}, (msg)=>{
	// 	res.send({text: msg});
	// });	
	res.send({data:'thanks'});
  	
});
module.exports = router;
