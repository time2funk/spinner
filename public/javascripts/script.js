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
		var len = $('#ws-text-size').val();
		var keylen = $('#ws-key-size').val();
		var key = $('#ws-key').val();
		var rkey = $('#ws-rkey').val();

		var title = 'text.txt'
		var text = '';

		if( key )
			text += 'Key: \"'+key+'\" \n';
		if( rkey )
			text += 'Replase Key: \"'+rkey+'\" \n';
		if( keylen )
			text += 'Key Percentage: '+keylen+' \n';
		if( len )
			text += 'Tottal length: '+len+' words\n';

		if( $('#ws-analiza').html() ){
			text += $('#ws-analiza').html();
		}
		// {
		// 	text += 'First 10 words statistic:'
		// 	for(var i=0; i<words.length; i++){
		// 		if(i==10)
		// 			break;
		// 		text += '\t '+words[i].key+' ['+ words.times +'] '+words.percentage+"%";
		// 	}
		// }
		text += '\n'+_out;
		download( text, title, 'text' );
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
		$('#ws-key').val('');
		$('#ws-rkey').val('');
		$('#ws-key-size').val('');
		$('#ws-analiza-body').html('');

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

			if(result.keylen)
				$('#ws-key-size').val(result.keylen);
			if(result.key)
				$('#ws-key').val(result.key);
			if(result.rkey)
				$('#ws-rkey').val(result.rkey);

			for(var i=0; i<result.words.length; i++){
				var el = '<tr>';

				for(var key in result.words[i]){
					el += '<td>';
					el += result.words[i][''+key];
					el += '</td>';
				}
				el += '/<tr>';
				$('#ws-analiza-body').append(el);
			}
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