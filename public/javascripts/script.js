'use strict'

$(()=>{

	console.log('script');

	$('.panel-btn').on('click', ()=>{
		console.log('panel btn');
		var body = $('.statistic');

		$(body).hasClass('show')
		?	$(body).removeClass('show')
		:	$(body).addClass('show');
	});

	$('#file-save-btn').on('click', ()=>{
		console.log('file save');
		var _out = $('#out-text').val();
		if(!_out)
			return;

		// \!!!!!!!!!!!!!!!!!!!!!!!!!!!
		var title = 'text.txt'
		download(_out, title, 'text' );
	});

	$('#generate').on('click',()=>{
		console.log('generate');
		var _in = $('#in-text');
		var main_tag = $('#ws-tag');
		var replase_tag = $('#ws-r-tag');
		var data = {};

		if(!_in.val())
			return;

		$('#out-text').val('');
		$('#ws-text-size').val('');

		var text = _in.val().replace(/[{|}]*/, '');
		data['text'] = text;

		if( main_tag.val() )
			data['m-tag'] = main_tag.val();
		if( replase_tag.val() )
			data['r-tag'] = replase_tag.val();

		ajax(data, (result)=>{
			console.log(result);
			var text = result.text;
			text = text.replace(/\\n/g , "\n");
			$('#out-text').val(text);
			$('#ws-text-size').val(result.len);
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

function download(data, filename, type) {
    var file = new Blob([data], {type: type});
    if (window.navigator.msSaveOrOpenBlob) // IE10+
        window.navigator.msSaveOrOpenBlob(file, filename);
    else { // Others
        var a = document.createElement("a"),
                url = URL.createObjectURL(file);
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        setTimeout(function() {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);  
        }, 0); 
    }
}