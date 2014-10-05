$(function() {
	stipo = GetURLParameter('stype')|0;
	sid = GetURLParameter('sid')|0;

	$(document).keyup(function(e) {
		if (e.keyCode == 27) {
			$('[data-required=true]').popover('destroy').removeClass('ms-inv');
		}
	});

	$(document).on('click','.volver',function(e){
		e.preventDefault();
		$('#bodytop').stop().scrollTo( 0,500);
	});

	$(document).on('click','.infobody .submit',function(evt){
		evt.preventDefault();
		var form=$('#infoform');
		var cont=0;
		var validar= new Validador();
		$.each(form.find('[data-required=true]'),function(val,element){
			var fun=$(element).data('fun');

			if($(element).val()==''){
				$(element).popover('destroy');
				$(element).data('content','Campo obligatorio');
				$(element).popover('show');
				cont++;
			}
			else if(fun!==undefined){
				if(!validar[fun]($(element).val())){
					var content=$(element).data('msgfun');
					$(element).popover('destroy');
					$(element).data('content',content);
					$(element).popover('show');
					cont++;
				}
			}
		});
if(cont==0){
	var data=($(infoform).serialize()+'&pre_ruta='+stipo+'&pre_rutaid='+sid);
	$.post( 'http://192.168.1.12/expofiss/index.php/savenew',data, function( data ) {
		if(data.estatus){
			$('.infobody').hide().css('padding','20px 20px');
			var html="<div class='alert alert-success' style='background-color:transparent;'><header style='text-align: center;' ><strong style='font-size:1.5em;'>Enviado Exitosamente </strong> <span class='glyphicon glyphicon-ok'></span></header><hr class='message-inner-separator'><p style='font-size:1.2em;'>Su información fue recibida, en breve, será contactado por nuestro equipo de ventas.</p></div>";
			$('.infobody').html(html);
			$('.infobody').show('fast');
		}
		else{
			$.each(data.error,function(key,val){
				var element=$('#'+val);
				if(element.data('fun')!=undefined){
					element.popover('destroy');
					element.data('content',element.data('msgfun'));
					element.popover('show');
				}
				else{
					element.popover('destroy');
					element.data('content','Campo obligatorio');
					element.popover('show');
				}
			});
		}
	},'json').fail(function(res){
		console.log('se cago');
	});
}
});

$(document).on('blur','[data-required=true]',function(e){
	e.preventDefault();
	if($(this).val().length==0){
		$(this).popover('destroy');
		$(this).data('content','Campo obligatorio..');
		$(this).addClass('ms-inv');
		$(this).popover('show');
	}
	else
	{
		$(this).popover('destroy').removeClass('ms-inv');
	}
});

$.getJSON( 'http://192.168.1.12/expofiss/index.php/tipoempresa', function( data ) {
	var select=$('.infobody .selectpicker');
	$.each(data, function(index, val) {
		var option=document.createElement('option');
		var text=document.createTextNode(val.tipo_des);
		option.appendChild(text);
		option.setAttribute('value',val.tipo_id);
		select.append(option);
	});
	$('.selectpicker').selectpicker();
	$('.selectpicker.btn').css('border','none');
});

function GetURLParameter(sParam)
{
	var sPageURL = window.location.search.substring(1);
	var sURLVariables = sPageURL.split('&');
	for (var i = 0; i < sURLVariables.length; i++)
	{
		var sParameterName = sURLVariables[i].split('=');
		if (sParameterName[0] == sParam)
		{
			return sParameterName[1];
		}
	}
}
function Validador()
{
	//argument[0] value
	this.ValidateEmail=function (){
		return /\S+@\S+\.\S+/.test(arguments[0]);
	}
	 //argument[0] value
	 this.ValidatePhone=function (){
	 	return /^\d{11}$/.test(arguments[0]);
	 }
}
});
