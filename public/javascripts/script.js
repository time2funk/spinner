'use strict'

$(()=>{

	console.log('script');

	$('.panel-btn').on('click', ()=>{
		var body = $('.vacab');

		$(body).hasClass('show')
		?	$(body).removeClass('show')
		:	$(body).addClass('show');
		
		// if( $(body).hasClass('show') ){
		// 	$(body).removeClass('show');
		// }else{
		// 	$(body).addClass('show');
		// }
	});

	$('#vocab-tool form').on('submit',(e)=>{
		if (e.preventDefault) e.preventDefault();
		// console.log(e);
	    // var elements = document.getElementById("myForm").elements;
	    var elements = e.target.elements;
	    var obj ={};
	    for(var i = 0 ; i < elements.length ; i++){
	        var item = elements.item(i);
	        obj[item.name] = item.value;
	    }
	    alert(JSON.stringify(obj));
	    
	    var data = obj;
	    // var data = {data : JSON.stringify(obj)};
	    // document.getElementById("demo").innerHTML = JSON.stringify(obj);

		ajax(data, (result)=>{
			console.log(result);
		});
	});

	$('#generate').on('click',()=>{
		var _in = $('#in-text');
		var lib = $('#active-vocab').val();

		var data = {'text': _in.val(), 'type': "text-spin", 'lib': lib};
		
		ajax(data, (result)=>{
			console.log(result);
			$('#out-text').val(result.text);
			// _out.append(result);
		});
	});

});

function ajax(data, callback){
	return $.ajax({
	  type: "POST",
	  url: '/',
	  data: data,
	  dataType: 'json',
	  success: function(response){
	  	callback(response);
	  },
	});
}

