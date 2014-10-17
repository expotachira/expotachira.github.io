$(function(){

$(document).on('click','.operador a',function(){
	$('[data-required=true]').popover('destroy').removeClass('ms-inv');
	$('button.ms-inv').removeClass('ms-inv');
	$('.operador').removeClass('active');
	$(this).closest('li').addClass('active');
	var uri = $(this).data('target');
	$( "#contenedor" ).load( uri, function() {
	  	if(uri=="panel.html"){
	  		$('#tar_fechrea').datetimepicker( {language: 'es',
				showToday: true,
				sideBySide: true,
				ampm: true,
				useStrict:true
			});
			$(".selectpicker").selectpicker();
			$('#tar_fechrea').data("DateTimePicker").setMinDate(moment().subtract(1, 'days'));
			$('#wrapclientes').trigger('click');
	  	}
	  	else if(uri=="panelclient.html"){
	  			$('.selectpicker').selectpicker();
				$('#wrapclientes').trigger('click');
	  	}
	  	else if(uri=="inicio.html"){
	  		$("#username").text(localStorage.getItem('usuario'));
	  	}
	});

});

$(document).on("click","#salir",function(){
	$.getJSON(localStorage.getItem('uri')+"/cerrar"+token, function( data ) {
		localStorage.setItem('token','');
		localStorage.setItem('usuario','');
		localStorage.setItem('uri','');
		window.location.href="login.html";
	});
});

$(".operador>a[data-target='inicio.html']").trigger('click');

});